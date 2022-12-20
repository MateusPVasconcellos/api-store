import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', httpStatus.NOT_FOUND);
    }

    const customerExists = await CustomersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError(
        'There is already a customer with this email',
        httpStatus.CONFLICT,
      );
    }

    customer.email = email;
    customer.name = name;

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await CustomersRepository.save(customer);

    return customer;
  }
}

export default new UpdateCustomerService();
