import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import httpStatus from 'http-status-codes';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', httpStatus.NOT_FOUND);
    }

    return order;
  }
}

export default new ShowOrderService();
