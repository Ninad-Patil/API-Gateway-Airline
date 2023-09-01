const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");

router.post("/", userController.createUser);

module.exports = router;
