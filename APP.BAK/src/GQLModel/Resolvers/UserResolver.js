require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');

const Query = {
  me: async(_, __, { DBModel, contextID }) => {
    try {
      if(!contextID && contextID.ngo) throw new AuthenticationError('Invalid operation')
      const user = await DBModel.User.findById({_id: contextID.id})
      console.log(user);
      return user;
    } catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }
  //  getUser: async (_, {email, username}, {DBModel})=>{
  //    const user = await DBModel.User.find({
  //      $or: [{email}, {username}],
  //    });
  //    console.log(user, email, username);
  //    // if (user && user.isArray()) return user[0];
  //    if (!user[0]) {
  //      return console.log('No User found');
  //    }
  //    return user[0];
  //  },
};

const Mutation = {
  signUp: async (_, values, {DBModel, ValidationModel}) => {
    try {
      // validate the data
      // todo  no checking if already exists? - Handle the error Accordingly
      const Value = await ValidationModel.User.SignUp.validateAsync(values.user);
      const hashedPassword = await bcrypt.hash(Value.password, 10);

      const savedUser = await DBModel.User.create({
        password: hashedPassword,
        email: Value.email,
        name: Value.name,
        contact: Value.contact,
        location: Value.location,
      });
      return jwt.sign({id: savedUser._id, ngo: false}, process.env.JWT_SECRET);
    } catch (err) {
      //TODO: handle the Validation and Database errors here and throw apprpriate Errors
      console.log('Error:', err);
      throw new Error(err);
    }
  },
  signIn: async (_, values, {DBModel, ValidationModel}) => {
    const {
      email,
      password,
    } = await ValidationModel.User.SignIn.validateAsync(values);

    let user = await DBModel.User.findOne({
      email
    });
    //try NGO
    if(!user) {
      user = await DBModel.NGO.findOne({
        email
      });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Incorrect credentials');
      }
      return jwt.sign({id: user._id, ngo: true}, process.env.JWT_SECRET);
    }
    //still not found then not registered
    if (!user) {
      throw new AuthenticationError('User does not exist');
    }
    // validate for the normal user
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Incorrect credentials');
    }
    return jwt.sign({id: user._id, ngo: false}, process.env.JWT_SECRET);
  },

  // TODO: Change use the authorisation context
  async editUser(_, {user}, {DBModel, ValidationModel, contextID}) {
    //const valid=jwt.verify(token, process.env.JWT_SECRET);
    //console.log(valid);
    //if (!valid) throw new AuthenticationError('invalid token');
    //const foundUser=await DBModel.User.findById(valid.id);
    //if (!foundUser) throw new AuthenticationError('not found');
    //for (const key in user) {
    // if (user[key]!=null) {
    // foundUser[key]=(key=='dateOfBirth')?new Date(user[key]):user[key];
    //  }
    // }
    //await foundUser.save();
    //return foundUser;
    try {
      if(!contextID && context.ngo) throw new AuthenticationError('Invalid operation')
      const Value = await ValidationModel.User.EditUser.validateAsync(user);
      if(Value.password) Value.password = await bcrypt.hash(Value.password, 10);
      const updatedUser = await DBModel.User.findOneAndUpdate(
        {_id: contextID.id}, {$set: {...Value}}, {new: true}
      );
      return updatedUser;
    } catch(err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

const User = {
  tasks: async(parent, _ , {DBModel}) => {
    let tasks = [];
    console.log(parent.tasks);
    for(let i = 0; i < parent.tasks.length; i++) {
      const foundUser = await DBModel.Task.findById({_id: parent.tasks[i]});
      tasks.push(foundUser);
    }
    // parent.tasks.forEach(async function (task, _) {
    //   const foundtask = await DBModel.Task.findById({_id: task});
    //   tasks.push(foundtask);
    // })
    console.log(tasks);
    return tasks;
  },
};

module.exports = {
  Query,
  Mutation,
  User
};
