import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import httpStatus from 'http-status-codes';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError(
        'There is already a product with this name',
        httpStatus.CONFLICT,
      );
    }

    const product = await productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);
    return product;
  }
}

export default new CreateProductService();
