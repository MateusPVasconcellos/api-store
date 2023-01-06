import { container } from 'tsyringe';
import { ICustomerRepositoriy } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomerRepositoriy>(
  'CustomersRepository',
  CustomersRepository,
);
