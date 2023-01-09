import { sessionUserDto } from '@modules/users/dto/body-session.dto';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();

sessionRouter.post('/', sessionUserDto(), SessionsController.create);

export default sessionRouter;
