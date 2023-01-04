import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { bodyCreateUpdateOrdersDto } from '../../dto/body-create-update-order.dto';
import { idOrdersDto } from '../../dto/id-order.dto';

const ordersRouter = Router();
ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', idOrdersDto(), OrdersController.show);

ordersRouter.post('/', bodyCreateUpdateOrdersDto(), OrdersController.create);

export default ordersRouter;
