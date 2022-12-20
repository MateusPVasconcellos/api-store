import RedisCache from '@shared/cache/RedisCache';
import { RedisCustomersKeys } from '@shared/enums/redis-customers-keys';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', httpStatus.NOT_FOUND);
    }

    await RedisCache.invalidate(RedisCustomersKeys.listCustomers);
    await CustomersRepository.remove(customer);
  }
}

export default new DeleteCustomerService();
