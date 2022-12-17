import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const order = await ShowOrderService.execute({ id });

    return response.status(httpStatus.OK).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const order = await CreateOrderService.execute({ customer_id, products });

    return response.status(httpStatus.CREATED).json(order);
  }
}

export default new OrdersController();
