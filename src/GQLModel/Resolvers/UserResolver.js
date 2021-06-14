require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');
const Query = {
  getUser: async (_, {email, username}, {DBModel})=>{
    const user = await DBModel.User.find({
      $or: [{email}, {username}],
    });
    console.log(user, email, username);
    // if (user && user.isArray()) return user[0];
    if (!user[0]) {
      return console.log('No User found');
    }
    return user[0];
  },
};

const Mutation = {
  signUp: async (_, values, {DBModel, ValidationModel}) => {
    try {
      // validate the data
      // todo  no checking if already exists?
      const Value = await ValidationModel.User.SignUp.validateAsync(values);
      const hashedPassword = await bcrypt.hash(Value.password, 10);

      const savedUser = await DBModel.User.create({
        username: Value.username,
        password: hashedPassword,
        email: Value.email,
      });
      console.log(savedUser);
      return jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);
    } catch (err) {
      console.log('Error:', err);
      throw new Error('Error Creating Account');
    }
  },
  signIn: async (_, values, {DBModel, ValidationModel}) => {
    const {
      username,
      email,
      password,
    } = await ValidationModel.User.SignIn.validateAsync(values);

    const user = await DBModel.User.findOne({
      $or: [{email}, {username}],
    });
    if (!user) {
      throw new AuthenticationError('Error Signing In');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error Signing In');
    }
    return jwt.sign({id: user._id}, process.env.JWT_SECRET);
  },
  async editUser(_, {token, user}, {DBModel, ValidationModel}) {
    const valid=jwt.verify(token, process.env.JWT_SECRET);
    console.log(valid);
    if (!valid) throw new AuthenticationError('invalid token');
    const foundUser=await DBModel.User.findById(valid.id);
    if (!foundUser) throw new AuthenticationError('not found');
    for (const key in user) {
      if (user[key]!=null) {
        foundUser[key]=(key=='dateOfBirth')?new Date(user[key]):user[key];
      }
    }
    await foundUser.save();
    return foundUser;
  },
};

module.exports = {
  Query,
  Mutation,
};
