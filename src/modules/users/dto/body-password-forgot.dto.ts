import { celebrate, Joi, Segments } from 'celebrate';

export const passwordForgotDto = function () {
  return celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  });
};
