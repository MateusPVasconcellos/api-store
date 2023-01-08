import { ICustomerRepositoriy } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomerRepositoriy,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const existsCostumer = await this.customersRepository.findById(customer_id);

    if (!existsCostumer) {
      throw new AppError('Costumer not found.', httpStatus.NOT_FOUND);
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Products not found.', httpStatus.NOT_FOUND);
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find products with id ${checkInexistentProducts[0].id}`,
        httpStatus.NOT_FOUND,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: existsCostumer,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productRepository.updateStock(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
