const Joi = require("joi");

const userSchema = Joi.object({
  userString: Joi.string().required(),
  favoriteImage: Joi.string().uri().required(),
});

module.exports = userSchema;
