import { Router } from 'express';
import UserController from '../controllers/UserController';
import { bodyUserDto } from '../helpers/body-user.dto';

const usersRouter = Router();

usersRouter.get('/', UserController.index);

usersRouter.post('/', bodyUserDto(), UserController.create);

export default usersRouter;
