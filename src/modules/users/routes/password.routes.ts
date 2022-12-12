import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { passwordForgotDto } from '../helpers/body-password-forgot.dto';
import { resetPasswordDto } from '../helpers/body-reset-password.dto';

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  passwordForgotDto(),
  ForgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  resetPasswordDto(),
  ResetPasswordController.create,
);

export default passwordRouter;
