const createHttpError = require("http-errors");
const Joi = require("joi");
const Validators = require("../validators");

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator does not exists`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      console.log("hej req body 1:", req.body);
      req.body = validated;
      console.log("hej req body 2:", req.body);
      next();
    } catch (error) {
      if (error.isJoi)
        return next(createHttpError(422, { message: error.message }));
      next(createHttpError(500));
    }
  };
};
