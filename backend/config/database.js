const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{

    }).then( () => {
        console.log("DB Connected Sucessfully");
    }).catch( (err) => {
        console.log("DB Connection failed");

        console.log("error occured " ,err);
        process.exit(1);
        
    });

}
