const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const  uploadImageToCloudinary = require('../utils/ImageUploader');
require('dotenv').config();


exports.createSubSection = async(req,res) => {
    try {
        
        const {sectionId , title,description,timeDuration} = req.body;

        const videoFile = req.files.videoFile;
        // console.log(title,description,timeDuration,sectionId);

        if(!sectionId || !title || !description|| !timeDuration || !videoFile) {
            
            console.log("Incomplete details");
            return res.status(400).json({
                success:false,
                message : "All fields are required"

            });
        }


        const uploadDetails = await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME);
        // console.log("Upload Details are as follow :",uploadDetails);

        const subsectionsDetails = await SubSection.create({
                                                            title:title,
                                                            timeDuration:timeDuration,
                                                            description:description,
                                                            videoUrl : uploadDetails.secure_url    
                                                             });


        const updateSection = await Section.findByIdAndUpdate({_id:sectionId}, { $push :{subSection:subsectionsDetails._id,}}, {new:true});
        //log out the updated setion using the populate

        return res.status(200).json({
            success:true,
            message : "Subsection added sucessfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "error in creating the Subsection"
        });
    }
}


exports.updateSubSection = async(req,res) => {   
    try {

        const {newsubSectionName,subSectionId} = req.body;
         
        if(!newsubSectionName || !subSectionId){
            return res.status(400).json({
                success:false,
                message : "Fill all the details"
            });
        }
        const updatedsubSectionName = await subSection.findByIdAndUpdate(subSectionId , {newsubSectionName : newsubSectionName},{new:true});



        return res.status(200).json({
            success:true,
            message : "SubSection Updated sucessFully",
            updatedsubSectionName
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "Error occur while updating the Section"
        });
    }
}



exports.deleteSubSection = async(req,res) => {

    try {
        
        const {subSectionId} = req.body;
        // if we assume that id by parameter then
        // const {sectionId} = req.params
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message :"Fill all the details"
            });
        }
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message : "SuccessFully deleted the subSection"
        });



    } catch (error) {
        console.log("Error occured",error);
        return res.status(500).json({
            success:false,
            message : "Error in deletign the section"
        });
    }
}

