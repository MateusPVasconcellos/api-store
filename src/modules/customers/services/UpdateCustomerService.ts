import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}

  public async execute({ id, name, email }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', httpStatus.NOT_FOUND);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError(
        'There is already a customer with this email.',
        httpStatus.CONFLICT,
      );
    }

    customer.email = email;
    customer.name = name;

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await this.customerRepository.saveCustomer(customer);

    return customer;
  }
}

export default UpdateCustomerService;
