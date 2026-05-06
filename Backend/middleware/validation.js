const Joi = require("joi");

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) return next();

  const errors = error.details.map(d => d.message).join(", ");
  return res.status(400).json({ error: errors });
};

const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  profile: Joi.object({
    name: Joi.string().max(30),
    bio: Joi.string().max(200),
    username: Joi.string().alphanum().min(3).max(20)
  })
};

module.exports = { validateRequest, authSchemas };