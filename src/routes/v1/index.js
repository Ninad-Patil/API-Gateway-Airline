const express = require("express");
//const { InfoController } = require("../../controllers");
//const { authRequestMiddleware } = require("../../middlewares");
const router = express.Router();
const userRouter = require("./user-routes");

//router.get("/info", authRequestMiddleware.checkAuth, InfoController.info);
router.use("/user", userRouter);
module.exports = router;

//uncomment the line to demonstrate the authentication for api
