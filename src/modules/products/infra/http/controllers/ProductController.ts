import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';
import httpStatus from 'http-status-codes';

class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const products = await ListProductService.execute();

    return response.status(httpStatus.OK).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const product = await ShowProductService.execute({ id });

    return response.status(httpStatus.OK).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const product = await CreateProductService.execute({
      name,
      price,
      quantity,
    });

    return response.status(httpStatus.CREATED).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const product = await UpdateProductService.execute({
      name,
      price,
      quantity,
      id,
    });

    return response.status(httpStatus.OK).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await DeleteProductService.execute({
      id,
    });

    return response.status(httpStatus.NO_CONTENT).json([]);
  }
}

export default new ProductController();
