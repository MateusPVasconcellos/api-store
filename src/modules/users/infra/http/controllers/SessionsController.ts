import CreateSessionService from '@modules/users/services/CreateSessionService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const user = await createSessionService.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}

export default new SessionController();
