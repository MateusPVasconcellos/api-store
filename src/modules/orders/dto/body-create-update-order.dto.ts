import { celebrate, Joi, Segments } from 'celebrate';

export const bodyCreateUpdateOrdersDto = function () {
  return celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  });
};
