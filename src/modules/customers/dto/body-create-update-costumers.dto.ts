import { celebrate, Joi, Segments } from 'celebrate';

export const BodyCreateUpdateCostumersDto = function () {
  return celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  });
};
