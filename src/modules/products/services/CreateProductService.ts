import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import httpStatus from 'http-status-codes';
import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already a product with this name',
        httpStatus.CONFLICT,
      );
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate(RedisProductsKeys.listProducts);
    await ProductRepository.save(product);
    return product;
  }
}

export default new CreateProductService();
