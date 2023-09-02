const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const appError = require("../utils/errors/app-error");

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

module.exports = { validateAuthRequest };
