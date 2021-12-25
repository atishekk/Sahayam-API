require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');

const Query={
  searchNGO: async (_, {Name: name}, {DBModel})=>{
    try {
      if (!name) throw new Error('NGO name not provided');
      const foundNGO=await DBModel.NGO.findOne({name});
      if (!foundNGO) throw new Error('NGO not found');
      return foundNGO;
    } catch (er) {
      console.log(er.message);
    }
  },
  getNGOs: async (_, values, {DBModel})=>{
    try {
      const foundNGOs=await DBModel.NGO.find();
      if (!foundNGOs) throw new Error('NGOs not found');
      return foundNGOs;
    } catch (er) {
      console.log(er.message);
    }
  },

  NGOme: async (_, __, {DBModel, contextID}) => {
    try {
      if(!contextID && !contextID.ngo) throw new AuthenticationError("Invalid operation");
      const ngo = await DBModel.NGO.findById({_id: contextID.id});
      console.log(ngo);
      return ngo;
    } catch(err) {
      throw new Error(err);
    } 
  }
};
const Mutation={
  registerNGO: async (_, {ngo}, {ValidationModel, DBModel})=>{
    try {
      const Value = await ValidationModel.NGO.RegisterNGO.validateAsync(ngo);
      const hashedPassword = await bcrypt.hash(Value.password, 10);

      const savedNGO = await DBModel.NGO.create({
        password: hashedPassword,
        email: Value.email,
        name: Value.name,
        location: Value.location,
        contact: Value.contact,
        about: Value.about,
        fields: Value.fields
      });

      console.log(savedNGO);
      if(savedNGO) return jwt.sign(
        {id: savedNGO._id, ngo: true},
        process.env.JWT_SECRET
      );
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
    }
  },
  editNGO: async (_, {ngo}, {DBModel, ValidationModel, contextID})=>{
    try {
      if(!contextID && !contextID.ngo) throw new Error("Invalid Context");
      const Value = await ValidationModel.NGO.EditNGO.validateAsync(ngo);

      if(Value.password) Value.password = await bcrypt.hash(Value.password, 10);
      const updatedNGO = await DBModel.NGO.findOneAndUpdate(
        {_id: contextID.id}, {$set: {...Value}}, {new: true}
      );
      return updatedNGO;
    } catch (err) {
      console.log(err.message);
      throw new Error(err)
    }
  },
};

const NGO = {
  tasks: async(parent, _ , {DBModel}) => {
    let tasks = [];
    parent.tasks.forEach(async (task, _) => {
      const foundtask = await DBModel.Task.findById({_id: task});
      tasks.push(foundtask);
    })
    return tasks;
  },
};
module.exports={
  Query, 
  Mutation,
  NGO
};
