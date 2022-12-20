import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustomersRepository.find();

    return customers;
  }
}

export default new ListCustomersService();
