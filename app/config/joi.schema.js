const Joi = require("joi");

exports.registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().lowercase().required(),
});

exports.loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().lowercase(),
})
  .with("email", "password")
  .with("username", "password")
  .xor("username", "email");

exports.updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  token: Joi.string().required(),
  email: Joi.string().email().lowercase(),
  confirm_password: Joi.ref("password"),
})
  .with("password", "confirm_password")
  .xor("email", "username");
