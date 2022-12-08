import { celebrate, Joi, Segments } from 'celebrate';

export const idProductDto = function () {
  return celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });
};
