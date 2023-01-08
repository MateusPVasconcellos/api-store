import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindAllByIds } from '@modules/products/domain/models/IFindAllByIds';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import {
  IProductRepository,
  SearchParams,
} from '@modules/products/domain/repositories/IProductRepository';
import { DataSource, In, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  public async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindAllByIds[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const productsExists = await this.find({
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
    const product = this.create({ name, price, quantity });

    await this.save(product);

    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.findOne({ where: { id } });

    return product;
  }

  public async removeProduct(product: Product): Promise<void> {
    await this.remove(product);
  }

  public async saveProduct(product: Product): Promise<void> {
    await this.save(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.save(products);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.createQueryBuilder()
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
