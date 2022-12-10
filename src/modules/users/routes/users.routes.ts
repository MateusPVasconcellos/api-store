import { Router } from 'express';
import UserController from '../controllers/UserController';
import { bodyUserDto } from '../helpers/body-user.dto';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();

usersRouter.get('/', isAuthenticated, UserController.index);

usersRouter.post('/', bodyUserDto(), UserController.create);

usersRouter.patch('');

export default usersRouter;
