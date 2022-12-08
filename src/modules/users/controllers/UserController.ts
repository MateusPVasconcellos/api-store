import { Request, Response } from 'express';
import CreateUsersService from '../services/CreateUsersService';
import ListUsersService from '../services/ListUsersService';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = ListUsersService.execute();

    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = CreateUsersService.execute({ name, email, password });

    return response.status(201).json(user);
  }
}

export default new UserController();
