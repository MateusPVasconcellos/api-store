import { celebrate, Joi, Segments } from 'celebrate';

export const resetPasswordDto = function () {
  return celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  });
};
