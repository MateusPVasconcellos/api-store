import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', httpStatus.NOT_FOUND);
    }

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await this.customerRepository.removeCustomer(customer);
  }
}

export default DeleteCustomerService;
