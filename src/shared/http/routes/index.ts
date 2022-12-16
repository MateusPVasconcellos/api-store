import costumersRouter from '@modules/customers/routes/customers.routes';
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

export default router;
