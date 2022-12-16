import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import httpStatus from 'http-status-codes';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', httpStatus.NOT_FOUND);
    }

    return customer;
  }
}

export default new ShowCustomerService();
