import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { BodyCreateUpdateProductDto } from '../dto/body-create-update-product.dto';
import { idProductDto } from '../dto/id-products.dto';

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
