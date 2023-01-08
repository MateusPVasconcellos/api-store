import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}

  public async execute(): Promise<ICustomer[]> {
    let customers = await RedisCache.recover<ICustomer[]>(
      RedisCustomersKeys.listCustomers,
    );

    if (!customers) {
      customers = await this.customerRepository.listCustomers();
      await RedisCache.save(RedisCustomersKeys.listCustomers, customers);
    }

    return customers;
  }
}

export default ListCustomersService;
