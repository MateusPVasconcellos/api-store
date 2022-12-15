import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { sessionUserDto } from '../dto/body-session.dto';

const sessionRouter = Router();

sessionRouter.post('/', sessionUserDto(), SessionsController.create);

export default sessionRouter;
