import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', httpStatus.NOT_FOUND);
    }

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await this.customerRepository.removeCustomer(customer);
  }
}

export default DeleteCustomerService;
