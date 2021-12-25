const Query = {
  feed: async (_, { tags }, { DBModel }) => {
    try {
      if (tags.length == 0) {
        const tasks = await DBModel.Task.find();
        return tasks;
      }
      const tasks = await DBModel.Task.find({ tags: { $in: tags } });
      return tasks;
    } catch (er) {
      console.log(er.message);
    }
  },

  //  getTask: async (_, { id }, { DBModel }) => {
  //    try {
  //      const foundTask = await DBModel.Task.findOne({ ID: id });
  //      console.log(foundTask.size());
  //      if (!foundTask[0]) throw new Error('Task not found');
  //      return foundTask;
  //    } catch (er) {
  //      console.log(er.message);
  //    }
  // },
  getTask: async (_, values, { DBModel }) => {
    try {
      const foundTasks = await DBModel.Task.find();
      if (!foundTasks) throw new Error('tasks not found');
      return foundTasks;
    } catch (er) {
      console.log(er.message);
    }
  }
};
const Mutation = {
  volunteer: async (_, { id }, { DBModel, contextID }) => {
    try {
      if(!contextID && contextID.ngo) throw new Error("Invalid Operation")

      const foundTask = await DBModel.Task.findOne({ _id: id });
      const foundUser = await DBModel.User.findOne({ _id: contextID.id });
      if(!foundTask) throw new Error("Task not found") 
      if (foundTask.volunteers.includes(contextID.id) || foundUser.tasks.includes(id)) {
        foundTask.volunteers = foundTask.volunteers.filter((i) => i != contextID.id);
        foundUser.tasks = foundUser.tasks.filter((i) => i != id);
        // console.log('xxx');
        await foundUser.save();
        await foundTask.save();
        return foundTask ? false: true;
      }
      foundTask.volunteers.push(contextID.id);
      foundUser.tasks.push(id);
      await foundUser.save();
      await foundTask.save();
      return foundTask ? true : false;
    } catch (err) {
      console.log(err.message);
      throw new Error(err)
    }
  },
  post: async (_, { task }, { DBModel, ValidationModel,  contextID }) => {
    try {
      if(!contextID && !contextID.ngo) throw new Error("Invalid Operation");
      const Value = await ValidationModel.Task.Post.validateAsync(task);
      Value.ngo = contextID.id
      const savedNGO = await DBModel.NGO.findById({_id: contextID.id});
      const savedtask = await DBModel.Task.create(Value);
      savedNGO.tasks.push(savedtask._id);
      await savedNGO.save();
      return savedtask;
    } catch (err) {
      console.log(err);
      throw new Error(err)
    }
  }
  //   unvolunteer: async (_, {id, username}, {DBModel})=>{
  //     try {
  //       if (!id || !username) throw new Error('User or Task not provided');
  //       const foundTask=await DBModel.Task.findOne({ID: id});
  //       const foundUser=await DBModel.User.findOne({username});
  //       if (!foundTask) throw new Error('Task not found');
  //       if (!foundUser) throw new Error('User not found');

  //       return foundTask;
  //     } catch (er) {
  //       console.log(er.message);
  //     }
  //   },
};

const Task = {
  ngo: async(parent, _, {DBModel}) => {
    const ngo = await DBModel.NGO.findById({_id: parent.ngo})
    return ngo;
  }
}

module.exports = {
  Query,
  Mutation,
  Task
};
