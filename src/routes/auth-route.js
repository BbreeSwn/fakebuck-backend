const express = require("express");
const authController = require("../controllers/auth-controller");
const { regiterValidator } = require("../middlewares/validator");

const authRouter = express.Router();
authRouter.post("/register", regiterValidator, authController.register);

module.exports = authRouter;
