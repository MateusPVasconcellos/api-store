import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already a product with this name.',
        httpStatus.CONFLICT,
      );
    }

    const product = this.productRepository.createProduct({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate(RedisProductsKeys.listProducts);
    return product;
  }
}

export default CreateProductService;
