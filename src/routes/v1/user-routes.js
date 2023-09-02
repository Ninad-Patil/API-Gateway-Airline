const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");
const { authRequestMiddleware } = require("../../middlewares");
router.post(
  "/signup",
  authRequestMiddleware.validateAuthRequest,
  userController.createUser
);
router.post(
  "/signin",
  authRequestMiddleware.validateAuthRequest,
  userController.signin
);

module.exports = router;
