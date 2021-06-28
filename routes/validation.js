//Validation
const Joi = require("@hapi/joi");

//Registration Validation
const registrationValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
    gender: Joi.string()
      .valid("male", "female").required()
      .error(() => "Gender should be Male (or) Female"),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
