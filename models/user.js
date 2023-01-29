const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 5000,
    },
  })
);

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(50).required().email(),
  };
  return Joi.validateUser(user,schema)
};
exports.User = User
exports.validate = validateUser