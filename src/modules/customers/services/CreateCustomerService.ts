import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customerExist = await CustomersRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError(
        'There is already a customer with this email',
        httpStatus.CONFLICT,
      );
    }

    const customer = await CustomersRepository.create({
      name,
      email,
    });

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await CustomersRepository.save(customer);
    return customer;
  }
}

export default new CreateCustomerService();
