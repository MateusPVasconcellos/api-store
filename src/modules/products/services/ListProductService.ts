import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IPaginateProduct {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Product[];
}

class ListProductService {
  public async execute(): Promise<IPaginateProduct> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = await productRepository.createQueryBuilder().paginate();

    return products as IPaginateProduct;
  }
}

export default new ListProductService();
