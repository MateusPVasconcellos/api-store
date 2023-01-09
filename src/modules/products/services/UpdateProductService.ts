import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import RedisCache from '@shared/cache/RedisCache';
import { RedisProductsKeys } from '../../../shared/enums/redis-products-keys';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IUpdateProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product Not Found.', httpStatus.NOT_FOUND);
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name != product.name) {
      throw new AppError(
        'There is already a product with this name.',
        httpStatus.CONFLICT,
      );
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await RedisCache.invalidate(RedisProductsKeys.listProducts);
    await this.productsRepository.saveProduct(product);

    return product;
  }
}

export default UpdateProductService;
