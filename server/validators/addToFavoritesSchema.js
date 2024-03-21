const Joi = require("joi");

const addToFavoritesSchema = Joi.object({
  userId: Joi.string().required(),
  selectedImage: Joi.string().uri().required(),
});

module.exports = addToFavoritesSchema;
