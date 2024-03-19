import Joi from "joi";

const imageSchema = Joi.object({
  link: Joi.string().uri().required(),
  kind: Joi.string().required(),
});

export default imageSchema;
