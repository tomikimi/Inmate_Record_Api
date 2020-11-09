const config = require("config");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: { type: String, minlength: 8, maxlength: 1024, required: true },
  dateCreated: { type: Date, default: new Date() },
});

userSchema.methods.generateAuthtoken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(5).max(255).required(),
    password: joi.string().min(8).max(1024).required(),
  };
  return joi.validate(user, schema);
}

module.exports.Users = User;
module.exports.ValidateUser = validateUser;
