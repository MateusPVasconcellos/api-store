import { passwordForgotDto } from '@modules/users/dto/body-password-forgot.dto';
import { resetPasswordDto } from '@modules/users/dto/body-reset-password.dto';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

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
