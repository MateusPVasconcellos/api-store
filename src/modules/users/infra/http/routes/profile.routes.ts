import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { bodyUpdateProfileDto } from '../dto/body-profile-update.dto';

const profileRouter = Router();
profileRouter.use(isAuthenticated);

profileRouter.get('/', ProfileController.show);

profileRouter.put('/', bodyUpdateProfileDto(), ProfileController.update);

export default profileRouter;
