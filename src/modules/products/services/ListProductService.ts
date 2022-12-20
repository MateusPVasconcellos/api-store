import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    let products = await RedisCache.recover<Product[]>(
      RedisProductsKeys.listProducts,
    );

    if (!products) {
      products = await ProductRepository.find();
      await RedisCache.save(RedisProductsKeys.listProducts, products);
    }

    return products;
  }
}

export default new ListProductService();
