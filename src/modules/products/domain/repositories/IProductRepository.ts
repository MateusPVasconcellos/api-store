import { ICreateProduct } from '../models/ICreateProduct';
import { IFindAllByIds } from '../models/IFindAllByIds';
import { IProduct } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | null>;

  findById(id: string): Promise<IProduct | null>;

  findAllByIds(products: IFindAllByIds[]): Promise<IProduct[]>;

  createProduct({ name, quantity, price }: ICreateProduct): Promise<IProduct>;

  removeProduct(product: IProduct): Promise<void>;

  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;

  saveProduct(product: IProduct): Promise<void>;

  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
