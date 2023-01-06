import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customerExist = await this.customerRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError(
        'There is already a customer with this email',
        httpStatus.CONFLICT,
      );
    }

    const customer = await this.customerRepository.createCustomer({
      name,
      email,
    });

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);

    return customer;
  }
}

export default CreateCustomerService;
