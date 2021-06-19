const Query = {
  getTasksByTags: async (_, { tags }, { DBModel }) => {
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
  getTask: async (_, { id }, { DBModel }) => {
    try {
      const foundTask = await DBModel.Task.findOne({ ID: id });
      console.log(foundTask.size());
      if (!foundTask[0]) throw new Error('Task not found');
      return foundTask;
    } catch (er) {
      console.log(er.message);
    }
  },
  getTasks: async (_, values, { DBModel }) => {
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
  volunteer: async (_, { id, username }, { DBModel }) => {
    try {
      if (!id || !username) throw new Error('User or Task not found');
      const foundTask = await DBModel.Task.findOne({ ID: id });
      const foundUser = await DBModel.User.findOne({ username });
      console.log(username, id);
      // eslint-disable-next-line max-len
      if (foundTask.volunteers.includes(username) || foundUser.tasks.includes(id)) {
        foundTask.volunteers = foundTask.volunteers.filter((i) => i != username);
        foundUser.tasks = foundUser.tasks.filter((i) => i != id);
        console.log('xxx');
        foundUser.save();
        foundTask.save();
        return foundTask;
      }
      foundTask.volunteers.push(username);
      foundUser.tasks.push(id);
      foundUser.save();
      foundTask.save();
      return foundTask;
    } catch (er) {
      console.log(er.message);
    }
  },
  post: async (_, { task }, { DBModel, ValidationModel }) => {
    try {
      const foundTask = await DBModel.Task.findOne({ ID: task.ID });
      if (foundTask) throw new Error('Already exists');
      // eslint-disable-next-line max-len
      //   const validatedTask=ValidationModel.Task.post.validateAsync(foundTask);
      //   console.log(task);
      await DBModel.Task.create(task);
      return task;
    } catch (er) {
      console.log(er.message);
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

module.exports = {
  Query,
  Mutation
};
