import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ id });
    return response.status(httpStatus.OK).json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
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
