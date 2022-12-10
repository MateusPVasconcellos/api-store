import productsRouter from '@modules/products/routes/products.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/session', sessionRouter);

export default router;
