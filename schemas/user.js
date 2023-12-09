const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

const verifySchema = Joi.object({
  email: Joi.string().required().email(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  registerSchema,
  subscriptionSchema,
  verifySchema,
};
