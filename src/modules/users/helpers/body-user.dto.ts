import { celebrate, Joi, Segments } from 'celebrate';

export const bodyUserDto = function () {
  return celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  });
};
