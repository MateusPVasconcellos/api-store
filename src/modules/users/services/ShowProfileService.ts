import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    return user;
  }
}

export default ShowProfileService;
