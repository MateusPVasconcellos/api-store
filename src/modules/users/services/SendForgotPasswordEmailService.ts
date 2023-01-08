import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokenRepository';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    const token = await this.userTokensRepository.generate(user.id);

    const forgotPasswordEmailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Password Recovery',
      templateData: {
        file: forgotPasswordEmailTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
