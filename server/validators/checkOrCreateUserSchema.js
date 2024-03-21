const Joi = require("joi");

const checkOrCreateUserSchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = checkOrCreateUserSchema;
