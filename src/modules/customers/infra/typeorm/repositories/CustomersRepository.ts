import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerRepositoriy } from '@modules/customers/domain/repositories/ICustomerRepository';
import { DataSource, Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomersRepository
  extends Repository<Customer>
  implements ICustomerRepositoriy
{
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  public async createCustomer({
    name,
    email,
  }: ICreateCustomer): Promise<Customer> {
    const customer = this.create({ name, email });

    await this.save(customer);

    return customer;
  }

  public async saveCustomer(customer: ICustomer): Promise<Customer> {
    await this.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
