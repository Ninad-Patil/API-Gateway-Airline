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
      throw new appError("password doesnt match", StatusCodes.NOT_FOUND);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof appError) throw error;
    console.log(error);
    throw new appError("something went wrong", StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  create,
  signin,
};
