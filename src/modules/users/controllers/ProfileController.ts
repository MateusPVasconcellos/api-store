import { classToClassFromExist } from 'class-transformer';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const user = await ShowProfileService.execute({ user_id });
    return response.status(httpStatus.OK).json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await UpdateProfileService.execute({
      email,
      name,
      password,
      user_id,
      old_password,
    });

    return response.status(httpStatus.OK).json(instanceToInstance(user));
  }
}

export default new ProfileController();
