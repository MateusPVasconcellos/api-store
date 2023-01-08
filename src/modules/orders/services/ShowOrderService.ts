import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', httpStatus.NOT_FOUND);
    }

    return order;
  }
}

export default ShowOrderService;
