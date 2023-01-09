import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerRepositoriy } from '@modules/customers/domain/repositories/ICustomerRepository';
import { AppDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomerRepositoriy {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  public async createCustomer({
    name,
    email,
  }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async saveCustomer(customer: ICustomer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async removeCustomer(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async listCustomers(): Promise<Customer[]> {
    const customers = await this.ormRepository.find();

    return customers;
  }
}

export default CustomersRepository;
