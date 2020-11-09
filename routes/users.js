const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Users, ValidateUser } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let email = await Users.findOne({ email: req.body.email });
  if (email) return res.status(400).send("Email Already Exist");

  const user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
