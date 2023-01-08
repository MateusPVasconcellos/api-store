import { SearchParams } from '@modules/products/domain/repositories/IProductRepository';
import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';
import { IOrderPaginate } from '../models/IOrderPaginate';

export interface IOrdersRepository {
  createOrder({ customer, products }: ICreateOrder): Promise<IOrder>;

  findById(id: string): Promise<IOrder | null>;

  findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
}
