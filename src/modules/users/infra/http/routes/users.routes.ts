import { Router } from 'express';
import UserController from '../controllers/UserController';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { bodyUserDto } from '@modules/users/dto/body-user.dto';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, UserController.index);

usersRouter.post('/', bodyUserDto(), UserController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
