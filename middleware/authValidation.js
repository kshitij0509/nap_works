const Joi = require("joi");

// Signup validation
const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name should have at least 3 characters.",
    "string.max": "Name should not exceed 50 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should have at least 6 characters.",
    "any.required": "Password is required.",
  }),
});

// Login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});

module.exports = { signupSchema, loginSchema };
