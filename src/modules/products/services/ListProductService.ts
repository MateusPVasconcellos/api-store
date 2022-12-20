import RedisCache from '@shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await ProductRepository.find();

    await RedisCache.save('teste', 'teste');

    return products;
  }
}

export default new ListProductService();
