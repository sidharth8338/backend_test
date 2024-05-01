const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../config/joi.schema");
const { errorResponse } = require("../utils/response.utils");

exports.validateRegisterInput = async (req, res, next) => {
  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).send(errorResponse(e));
  }
};

exports.validateLoginInput = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).send(errorResponse(e));
  }
};

exports.validateProfileUpdate = async (req, res, next) => {
  try {
    await updateProfileSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).send(errorResponse(e));
  }
};
