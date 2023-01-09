import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindAllByIds } from '@modules/products/domain/models/IFindAllByIds';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import {
  IProductRepository,
  SearchParams,
} from '@modules/products/domain/repositories/IProductRepository';
import { AppDataSource } from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindAllByIds[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const productsExists = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  }

  public async createProduct({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.ormRepository.findOne({ where: { id } });

    return product;
  }

  public async removeProduct(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async saveProduct(product: Product): Promise<void> {
    await this.ormRepository.save(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }
}

export default ProductRepository;
