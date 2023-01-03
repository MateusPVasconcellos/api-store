import { AppDataSource } from '@shared/typeorm/data-source';
import { In } from 'typeorm';
import Product from '../entities/Product';

interface IFindAllByIds {
  id: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  },

  async findAllByIds(products: IFindAllByIds[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const productsExists = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  },
});
