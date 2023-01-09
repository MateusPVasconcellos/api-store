import { BodyCreateUpdateProductDto } from '@modules/products/dto/body-create-update-product.dto';
import { idProductDto } from '@modules/products/dto/id-products.dto';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();

productsRouter.get('/', ProductController.index);

productsRouter.get('/:id', idProductDto(), ProductController.show);

productsRouter.post(
  '/',
  BodyCreateUpdateProductDto(),
  ProductController.create,
);

productsRouter.put(
  '/:id',
  BodyCreateUpdateProductDto(),
  idProductDto(),
  ProductController.update,
);

productsRouter.delete('/:id', idProductDto(), ProductController.delete);

export default productsRouter;
