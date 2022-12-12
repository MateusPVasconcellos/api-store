import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { passwordForgotDto } from '../helpers/body-password-forgot.dto';

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  passwordForgotDto(),
  ForgotPasswordController.create,
);

export default passwordRouter;
