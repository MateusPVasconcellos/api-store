import { AppDataSource } from '@shared/infra/typeorm/data-source';
import UserToken from '../entities/UserToken';

export const UserTokensRepository = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  },

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});