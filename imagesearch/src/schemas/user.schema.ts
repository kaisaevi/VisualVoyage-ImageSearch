import Joi from "joi";

const userSchema = Joi.object({
  userId: Joi.string().required(),
  favorites: Joi.array().required(),
});

export default userSchema;
