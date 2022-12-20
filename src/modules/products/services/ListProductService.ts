import RedisCache from '@shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    let products = await RedisCache.recover<Product[]>('shop_api-PRODUCT-LIST');

    if (!products) {
      products = await ProductRepository.find();
      await RedisCache.save('shop_api-PRODUCT-LIST', products);
    }

    return products;
  }
}

export default new ListProductService();
