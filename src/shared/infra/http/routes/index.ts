import costumersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

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
