import { celebrate, Joi, Segments } from 'celebrate';

export const idOrdersDto = function () {
  return celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  });
};
