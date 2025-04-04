const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema({

    gender:{
        type:String,
    },
    dateofBirth : {
        type : String
    },
    about:{
        type:String,
        trim:true 
    },
    contactNumber:{
        type:String,
        trim:true
    }
});

module.exports = mongoose.model('Profile',profileScheme);
