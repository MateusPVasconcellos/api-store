import { celebrate, Joi, Segments } from 'celebrate';

export const BodyCreateUpdateProductDto = function () {
  return celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  });
};
