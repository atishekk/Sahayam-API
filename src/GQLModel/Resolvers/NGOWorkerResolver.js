require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');
const Query = {
  getNGOWorker: async (_, {email, username}, {DBModel})=>{
    const user = await DBModel.NGOWorker.find({
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

      const Value =await ValidationModel.NGOWorker.SignUp.validateAsync(values);
      const hashedPassword = await bcrypt.hash(Value.password, 10);

      const savedWorker = await DBModel.NGOWorker.create({
        username: Value.username,
        password: hashedPassword,
        email: Value.email,
      });
      console.log(savedWorker);
      return jwt.sign({id: savedWorker._id}, process.env.JWT_SECRET);
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
    } = await ValidationModel.NGOWorker.SignIn.validateAsync(values);

    const worker = await DBModel.NGOWorker.findOne({
      $or: [{email}, {username}],
    });
    if (!worker) {
      throw new AuthenticationError('Error Signing In');
    }
    const valid = await bcrypt.compare(password, worker.password);
    if (!valid) {
      throw new AuthenticationError('Error Signing In');
    }
    return jwt.sign({id: worker._id}, process.env.JWT_SECRET);
  },

  async editNGOWorker(_, {token, worker}, {DBModel, ValidationModel}) {
    const valid=jwt.verify(token, process.env.JWT_SECRET);
    console.log(valid);
    if (!valid) throw new AuthenticationError('invalid token');
    const foundWorker=await DBModel.NGOWorker.findById(valid.id);
    if (!foundWorker) throw new AuthenticationError('not found');
    for (const key in worker) {
      if (worker[key]!=null) foundWorker[key]=worker[key];
    }
    await foundWorker.save();
    return foundWorker;
  },


};

module.exports = {
  Query,
  Mutation,
};
