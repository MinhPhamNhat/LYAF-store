//Impport library:
const mongoose = require('mongoose');
async function connect_db(){
    try {
        await mongoose.connect('mongodb://localhost:27017/starter_nodejs', {
            // useNewUrlParser: true,    |
            // useUnifiedTopology: true, | <= no longer necessary
            // useFindAndModify: false,  |
            // useCreateIndex: true      |
            });
            console.log('Connect successfully !!!');
    } catch (error) {
            console.log(error);
    }
}

module.exports = connect_db;