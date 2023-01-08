import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product Not Found.', httpStatus.NOT_FOUND);
    }

    return product;
  }
}

export default ShowProductService;
