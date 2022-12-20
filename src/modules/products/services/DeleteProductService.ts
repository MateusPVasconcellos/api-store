import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import httpStatus from 'http-status-codes';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product Not Found', httpStatus.NOT_FOUND);
    }

    await ProductRepository.remove(product);
  }
}

export default new DeleteProductService();
