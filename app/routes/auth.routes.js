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
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", validateLoginInput, authenticateUser);
router.patch(
  "/updateProfile",
  [validateProfileUpdate, isAuthenticated],
  updateProfileController
);
router.post("/register", validateRegisterInput, registerUser);

module.exports = router;
