const express = require("express");
const {
  authenticateUser,
  registerUser,
  updateProfileController,
} = require("../controllers/auth.controller");
const {
  validateLoginInput,
  validateProfileUpdate,
  validateRegisterInput,
} = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/login", validateLoginInput, authenticateUser);
router.patch("/updateProfile", validateProfileUpdate, updateProfileController);
router.post("/register", validateRegisterInput, registerUser);

module.exports = router;
