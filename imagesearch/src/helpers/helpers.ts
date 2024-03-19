import { Schema } from "joi";

const checkValidity = (data: unknown, schema: Schema) => {
  const { error } = schema.validate(data, { abortEarly: true });

  return !error;
};

export default checkValidity;
