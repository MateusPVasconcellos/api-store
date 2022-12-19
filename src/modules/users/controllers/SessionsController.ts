import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await CreateSessionService.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}

export default new SessionController();
