require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");

module.exports = {
  signUp: async (_, values, { DBModel, ValidationModel }) => {
    try {
      //validate the data

      const Value = await ValidationModel.User.SignUp.validateAsync(values);
      const hashed_password = await bcrypt.hash(Value.password, 10);

      const saved_user = await DBModel.User.create({
        username: Value.username,
        password: hashed_password,
        email: Value.email
      });
      console.log(saved_user);
      return jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log("Error:", err);
      throw new Error("Error Creating Account");
    }
  },
  signIn: async (_, values, { DBModel, ValidationModel }) => {
    try {
      const {
        username,
        email,
        password
      } = await ValidationModel.User.SignIn.validateAsync(values);

      const user = await DBModel.User.findOne({
        $or: [{ email }, { username }]
      });
      if (!user) {
        throw new AuthenticationError("Error Signing In");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Error Signing In");
      }
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error(err)
    }
  }
};
