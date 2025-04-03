const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const SubsectionSchema = new mongoose.Schema ({

    sectionName:{
        type:String
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]

});

module.exports = mongoose.model('SubSection' , SubsectionSchema); 