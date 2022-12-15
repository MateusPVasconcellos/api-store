import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
profileRouter.use(isAuthenticated);

profileRouter.get('/', ProfileController.show);

profileRouter.put('/', ProfileController.update);

export default profileRouter;
