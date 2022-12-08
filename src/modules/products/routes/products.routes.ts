import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();

productsRouter.get('/', ProductController.index);

productsRouter.get('/:id', ProductController.show);

productsRouter.post('/', ProductController.create);

productsRouter.put('/:id', ProductController.update);

productsRouter.delete('/:id', ProductController.delete);

export default productsRouter;
