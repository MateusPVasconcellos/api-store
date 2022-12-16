import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import { BodyCreateUpdateCostumersDto } from '../dto/body-create-update-costumers.dto';
import { idCostumersDto } from '../dto/id-costumers.dto';

const costumersRouter = Router();

costumersRouter.get('/', CustomersController.index);

costumersRouter.get('/:id', idCostumersDto(), CustomersController.show);

costumersRouter.post(
  '/',
  BodyCreateUpdateCostumersDto(),
  CustomersController.create,
);

costumersRouter.put(
  '/:id',
  BodyCreateUpdateCostumersDto(),
  idCostumersDto(),
  CustomersController.update,
);

costumersRouter.delete('/:id', idCostumersDto(), CustomersController.delete);

export default costumersRouter;
