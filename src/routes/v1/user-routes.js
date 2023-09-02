const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");

router.post("/signup", userController.createUser);
router.post("/signin", userController.signin);

module.exports = router;
