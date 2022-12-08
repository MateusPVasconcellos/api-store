import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { bodyProductDto } from '../helpers/body-product.dto';
import { idProductDto } from '../helpers/id-products.dto';

const productsRouter = Router();

productsRouter.get('/', ProductController.index);

productsRouter.get('/:id', idProductDto(), ProductController.show);

productsRouter.post('/', bodyProductDto(), ProductController.create);

productsRouter.put(
  '/:id',
  bodyProductDto(),
  idProductDto(),
  ProductController.update,
);

productsRouter.delete('/:id', idProductDto(), ProductController.delete);

export default productsRouter;
