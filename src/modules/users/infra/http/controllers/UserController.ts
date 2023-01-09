import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUsersService from '@modules/users/services/CreateUsersService ';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return response.status(httpStatus.OK).json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUsersService = container.resolve(CreateUsersService);

    const user = await createUsersService.execute({ name, email, password });

    return response.status(httpStatus.CREATED).json(instanceToInstance(user));
  }
}

export default new UserController();
