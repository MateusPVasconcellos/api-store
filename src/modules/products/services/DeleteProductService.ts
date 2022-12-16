import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositorys/ProductRepository';
import httpStatus from 'http-status-codes';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product Not Found', httpStatus.NOT_FOUND);
    }

    await productRepository.remove(product);
  }
}

export default new DeleteProductService();
