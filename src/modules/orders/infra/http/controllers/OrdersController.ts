import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { container } from 'tsyringe';

class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);

    const order = await showOrderService.execute({ id });

    return response.status(httpStatus.OK).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const order = await CreateOrderService.execute({ customer_id, products });

    return response.status(httpStatus.CREATED).json(order);
  }
}

export default new OrdersController();
