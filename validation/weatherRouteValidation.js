import Joi from "joi";

export const weatherSchema = Joi.object({
  location: Joi.string().required(),
  date1: Joi.date().iso(),
  date2: Joi.date().iso(),
});
