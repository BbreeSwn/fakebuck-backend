const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

//handle regiter
authController.register = async (req, res, next) => {
  try {
    //req.input password
    const data = req.input;
    const exitUser = await userService.findUserByEmailOrMobile(
      data.email || data.mobile
    );

    if (exitUser) {
      createError({
        message: "email or mobile already in use",
        field: "emailOrMobile",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const exitUser = await userService.findUserByEmailOrMobile(
      req.input.emailOrMobile
    );
    if (!exitUser) {
      createError({
        message: "invalid credential",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(
      req.input.password,
      exitUser.password
    );
    if (!isMatch) {
      createError({
        message: "invalid credential",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: exitUser.id })
    res.status(200).json({accessToken})
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
