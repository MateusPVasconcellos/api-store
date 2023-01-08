import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { CryptHelper } from '../helpers/crypt-helper';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError(
        'There is already a user with this email.',
        httpStatus.CONFLICT,
      );
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.', httpStatus.BAD_REQUEST);
    }

    if (password && old_password) {
      const checkOldPass = await CryptHelper.compare(
        old_password,
        user.password,
      );
      if (!checkOldPass) {
        throw new AppError(
          'Old password does not match.',
          httpStatus.UNAUTHORIZED,
        );
      }
      user.password = await CryptHelper.encrypt(password, 10);
    }
    user.name = name;
    user.email = email;

    await this.usersRepository.saveUser(user);

    return user;
  }
}

export default UpdateProfileService;
