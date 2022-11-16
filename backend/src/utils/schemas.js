const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  userSchema,
}