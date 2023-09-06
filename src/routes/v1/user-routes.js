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
router.post(
  "/role",
  authRequestMiddleware.checkAuth,
  authRequestMiddleware.isAdmin,
  userController.addRoleToUser
);
module.exports = router;
