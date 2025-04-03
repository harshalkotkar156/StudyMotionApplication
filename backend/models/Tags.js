const mongoose = required('mongoose');

const tagSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    description :{
        type:String,
    }

});

module.exports = mongoose.module("Tag",tagSchema);