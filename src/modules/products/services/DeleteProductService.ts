import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product Not Found.', httpStatus.NOT_FOUND);
    }

    await RedisCache.invalidate(RedisProductsKeys.listProducts);
    await this.productRepository.removeProduct(product);
  }
}

export default DeleteProductService;
