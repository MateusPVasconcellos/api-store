import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    let customers = await RedisCache.recover<Customer[]>(
      RedisCustomersKeys.listCustomers,
    );

    if (!customers) {
      customers = await CustomersRepository.find();
      await RedisCache.save(RedisCustomersKeys.listCustomers, customers);
    }

    return customers;
  }
}

export default new ListCustomersService();
