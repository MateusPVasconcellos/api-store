import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import httpStatus from 'http-status-codes';
import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product Not Found', httpStatus.NOT_FOUND);
    }

    const productExists = await ProductRepository.findByName(name);

    if (productExists && name != product.name) {
      throw new AppError(
        'There is already a product with this name',
        httpStatus.CONFLICT,
      );
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await RedisCache.invalidate(RedisProductsKeys.listProducts);
    await ProductRepository.save(product);

    return product;
  }
}

export default new UpdateProductService();
