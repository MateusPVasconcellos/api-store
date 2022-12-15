import { celebrate, Joi, Segments } from 'celebrate';

export const sessionUserDto = function () {
  return celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });
};
