const { UserRepository } = require("../repositories");
const appError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Auth } = require("../utils/common");

const userRepo = new UserRepository();

async function create(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new appError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new appError(
      "cannot create a new user obj",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new appError("user not found", StatusCodes.NOT_FOUND);
    }
    const mathchedPassword = Auth.checkPassword(data.password, user.password);
    if (!mathchedPassword) {
      throw new appError("password doesnt match", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof appError) throw error;
    console.log(error);
    throw new appError("something went wrong", StatusCodes.BAD_REQUEST);
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new appError("token not found", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = await userRepo.get(response.id);
    if (!user) {
      throw new appError("No user found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof appError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new appError("invalid jwt token", StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw error;
  }
}

module.exports = {
  create,
  signin,
  isAuthenticated,
};
