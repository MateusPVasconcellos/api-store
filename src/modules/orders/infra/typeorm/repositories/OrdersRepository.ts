import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { DataSource, Repository } from 'typeorm';
import Order from '../entities/Order';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class OrdersRepository extends Repository<Order> implements IOrdersRepository {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
  public async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: {
        id,
      },
    });
    return order;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }
}

export default OrdersRepository;
