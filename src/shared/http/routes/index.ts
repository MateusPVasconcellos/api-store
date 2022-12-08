import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);

export default router;
