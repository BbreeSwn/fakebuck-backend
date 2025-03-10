const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).required().strip(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  //   email: Joi.string().default(Joi.ref('emailOrMobile')).forbidden(),
  //   mobile: Joi.string().default(Joi.ref('emailOrMobile')).forbidden()
  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});










// const test = {
//   firstName: "aaa",
//   lastName: "bbb",
//   emailOrMobile: "bbb@mail.com",
//   password: "111111",
//   confirmPassword: "111111",
// };

// const { value, error } = registerSchema.validate(test);
// console.log(value);
// console.log(error);
