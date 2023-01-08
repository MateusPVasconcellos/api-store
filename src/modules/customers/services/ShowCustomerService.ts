import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepositoriy } from '../domain/repositories/ICustomerRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepositoriy,
  ) {}
  public async execute({ id }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', httpStatus.NOT_FOUND);
    }

    return customer;
  }
}

export default ShowCustomerService;
