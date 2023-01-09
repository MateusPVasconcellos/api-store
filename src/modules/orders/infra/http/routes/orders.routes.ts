import { bodyCreateUpdateOrdersDto } from '@modules/orders/dto/body-create-update-order.dto';
import { idOrdersDto } from '@modules/orders/dto/id-order.dto';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', idOrdersDto(), OrdersController.show);

ordersRouter.post('/', bodyCreateUpdateOrdersDto(), OrdersController.create);

export default ordersRouter;
