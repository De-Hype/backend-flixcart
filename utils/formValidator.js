const Joi = require("joi");
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const SignUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(4).max(15).required(),
});

const SignInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).max(15).required()
});

const addProductSchema = Joi.object({
    name:Joi.string().required(),
    imageUrl:Joi.string().required(),
    description:Joi.string().required(),
    discount_percent:Joi.number().min(1),
    new_price:Joi.number().required().min(1),
    old_price:Joi.number().min(1),
    ratings:Joi.number(),
})
exports.validateSignUp = validator(SignUpSchema)
exports.validateSignIn = validator(SignInSchema)
exports.validateAddProductToDb = validator(addProductSchema)