import { Router } from 'express';
import UserController from '../controllers/UserController';
import { bodyUserDto } from '../helpers/body-user.dto';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, UserController.index);

usersRouter.post('/', bodyUserDto(), UserController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
