import { Request, Response } from 'express';
import CreateUsersService from '../services/CreateUsersService ';
import ListUsersService from '../services/ListUsersService';
import httpStatus from 'http-status-codes';
import { instanceToInstance } from 'class-transformer';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await ListUsersService.execute();
    return response.status(httpStatus.OK).json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await CreateUsersService.execute({ name, email, password });

    return response.status(httpStatus.CREATED).json(instanceToInstance(user));
  }
}

export default new UserController();
