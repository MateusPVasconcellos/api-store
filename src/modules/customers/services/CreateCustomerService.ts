import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import httpStatus from 'http-status-codes';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({
    name,
    email,
  }: IRequest): Promise<Customer | AppError> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customerExist = await customersRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError(
        'There is already a customer with this email',
        httpStatus.CONFLICT,
      );
    }

    const customer = await customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);
    return customer;
  }
}

export default new CreateCustomerService();
