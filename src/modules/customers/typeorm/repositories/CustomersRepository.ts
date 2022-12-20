import { AppDataSource } from 'src/data-source';
import Customer from '../entities/Customer';

export const CustomersRepository = AppDataSource.getRepository(Customer).extend(
  {
    async findByName(name: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          name,
        },
      });

      return customer;
    },

    async findById(id: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          id,
        },
      });

      return customer;
    },

    async findByEmail(email: string): Promise<Customer | null> {
      const customer = await this.findOne({
        where: {
          email,
        },
      });

      return customer;
    },
  },
);
