const Section = require('../models/Section');
const Course = require("../models/Course");

exports.createSection = async(req,res) => {

    try {

        const {sectionName,courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message : "Fill all the details"
            });

        }
        const newSection = await Section.create({sectionName});
        //ithe populate karycha ahe so that both section and subsections objects will be visible
        const updatedCourseDetails = await Course.findByIdAndUpdate ({courseId} , { $push : {courseContent : newSection._id}},{new:true});


        return res.status(200).json({
            success:true,
            message : "Section SucessFullly added",
            updatedCourseDetails
        });




        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "Error occur while creating the Section"
        });
    }
}

exports.updateSection = async(req,res) => {


    try {

        const {newSectionName,sectionId} = req.body;
         
        if(!newSectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message : "Fill all the details"
            });
        }

        const updatedSectionName = await Section.findByIdAndUpdate(sectionId , {sectionName : newSectionName},{new:true});



        return res.status(200).json({
            success:true,
            message : "Section Updated sucessFully",
            updatedSectionName
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "Error occur while updating the Section"
        });
    }
}



exports.deleteSection = async(req,res) => {

    try {
        
        const {sectionId} = req.body;
        // if we assume that id by parameter then
        // const {sectionId} = req.params
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message :"Fill all the details"
            });
        }
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message : "SuccessFully deleted the section"
        });



    } catch (error) {
        console.log("Error occured",error);
        return res.status(500).json({
            success:false,
            message : "Error in deletign the section"
        });
    }
}

