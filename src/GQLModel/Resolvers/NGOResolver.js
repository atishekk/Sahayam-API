require('dotenv').config();
const Query={
  getNGO: async (_, {Name: name}, {DBModel})=>{
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
};
const Mutation={
  registerNGO: async (_, {Ngo: ngo}, {ValidationModel, DBModel})=>{
    try {
      if (!ngo) throw new Error('Data not provided');
      const validatedModel=ValidationModel.NGO.register.validateAsync(ngo);
      if (!validatedModel) throw new Error('Invalid data');
      const foundNGO=await DBModel.NGO.find({name: ngo.name});
      console.log(foundNGO);
      if (foundNGO[0]) throw new Error('Alredy exists');
      const saved= await DBModel.NGO.create(ngo);
      return saved;
    } catch (er) {
      console.log(er.message);
    }
  },
  updateNGO: async (_, {Name: name, Ngo: ngo}, {DBModel, ValidationModel})=>{
    try {
      if (!ngo) throw new Error('Data not provided');
      const validatedModel=ValidationModel.NGO.register.validateAsync(ngo);
      if (!validatedModel) throw new Error('Invalid data');
      const foundNGO=await DBModel.NGO.findOne({name});
      if (!foundNGO) throw new Error('Does not exist');
      // eslint-disable-next-line guard-for-in
      for (const data in ngo) {
        foundNGO[data]=ngo[data];
      }
      const saved= await foundNGO.save();
      return saved;
    } catch (er) {
      console.log(er.message);
    }
  },
};
module.exports={
  Query, Mutation,
};
