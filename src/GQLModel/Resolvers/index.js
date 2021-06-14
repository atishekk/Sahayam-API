const userResolver =require('./UserResolver');
const NGOWorkerResolver =require('./NGOWorkerResolver');
const NGOResolver = require('./NGOResolver');
const TaskResolver = require('./TaskResolver');
module.exports={
  ...TaskResolver,
};
