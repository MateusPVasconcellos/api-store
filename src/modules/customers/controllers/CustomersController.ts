import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const costumers = await ListCustomersService.execute();

    return response.status(httpStatus.OK).json(costumers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const costumer = await ShowCustomerService.execute({ id });

    return response.status(httpStatus.OK).json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const costumer = await CreateCustomerService.execute({
      name,
      email,
    });

    return response.status(httpStatus.CREATED).json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const costumer = await UpdateCustomerService.execute({
      name,
      email,
      id,
    });

    return response.status(httpStatus.OK).json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await DeleteCustomerService.execute({
      id,
    });

    return response.status(httpStatus.NO_CONTENT).json([]);
  }
}

export default new CustomersController();
