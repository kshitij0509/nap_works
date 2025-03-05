const Joi = require("joi");

const postSchema = Joi.object({
  postName: Joi.string().min(3).required().messages({
    "string.min": "Post name should have at least 3 characters.",
    "any.required": "Post name is required.",
  }),
  description: Joi.string().min(10).required().messages({
    "string.min": "Description should have at least 10 characters.",
    "any.required": "Description is required.",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  imageUrl: Joi.string().uri().optional().messages({
    "string.uri": "Image URL must be a valid URL.",
  }),
});

module.exports = postSchema;
