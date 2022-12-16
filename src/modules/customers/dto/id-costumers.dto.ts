import { celebrate, Joi, Segments } from 'celebrate';

export const idCostumersDto = function () {
  return celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });
};
