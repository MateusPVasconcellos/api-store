import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRepositoriy {
  findByName(name: string): Promise<ICustomer | null>;

  findById(id: string): Promise<ICustomer | null>;

  findByEmail(email: string): Promise<ICustomer | null>;

  createCustomer({ name, email }: ICreateCustomer): Promise<ICustomer>;

  saveCustomer(customer: ICustomer): Promise<ICustomer>;
}
