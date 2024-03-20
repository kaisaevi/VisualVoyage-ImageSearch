import Joi from "joi";

const userSchema = Joi.object({
  userId: Joi.string().required(),
  favorites: Joi.array(),
});

export default userSchema;
