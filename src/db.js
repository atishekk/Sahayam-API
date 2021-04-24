const mongoose = require('mongoose');

module.exports = {
    connect: DB => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(DB).then(r => {
            console.log("Database connected \n");
        });

        mongoose.connection.on('error', err => {
            console.log("MongoDB connection failed");
            process.exit()
        })
    }
}