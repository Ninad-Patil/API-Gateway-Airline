const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { successResponse, ErrorResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });

    successResponse.data = user;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });

    successResponse.data = user;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  signin,
};
