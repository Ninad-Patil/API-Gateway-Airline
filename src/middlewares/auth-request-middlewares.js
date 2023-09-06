const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const appError = require("../utils/errors/app-error");
const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "someting went wrong while authenticating the user";
    ErrorResponse.error = new appError(
      ["email not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.password) {
    ErrorResponse.message = "someting went wrong while authenticating the user";
    ErrorResponse.error = new appError(
      ["password not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response; //setting the user id in request obj
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

async function isAdmin(req, res, next) {
  try {
    console.log(req.user);
    const response = await UserService.isAdmin(req.user);
    if (!response) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User is not authorized for this action",
      });
    }
    next();
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin,
};
