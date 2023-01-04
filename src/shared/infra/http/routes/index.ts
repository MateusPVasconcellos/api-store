import costumersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/routes/orders.routes';
import productsRouter from '@modules/products/routes/products.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/costumers', costumersRouter);
router.use('/orders', ordersRouter);

export default router;
