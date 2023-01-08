import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { container } from 'tsyringe';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomersService from '../../../services/ListCustomersService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomersService = container.resolve(ListCustomersService);

    const costumers = await listCustomersService.execute();

    return response.status(httpStatus.OK).json(costumers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = container.resolve(ShowCustomerService);

    const costumer = await showCustomerService.execute({ id });

    return response.status(httpStatus.OK).json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const costumer = await createCustomerService.execute({
      name,
      email,
    });

    return response.status(httpStatus.CREATED).json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerService = container.resolve(UpdateCustomerService);

    const costumer = await updateCustomerService.execute({
      name,
      email,
      id,
    });

    return response.status(httpStatus.OK).json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({
      id,
    });

    return response.status(httpStatus.NO_CONTENT).json([]);
  }
}

export default new CustomersController();
