import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository
  extends Repository<UserToken>
  implements IUserTokensRepository
{
  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }

  public async deleteToken(token_id: string): Promise<void> {
    await this.delete(token_id);
  }
}

export default UserTokensRepository;
