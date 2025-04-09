const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/ImageUploader");

require('dotenv').config();

exports.createCourse = async(req,res) =>{

    try {
        
        const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body;

        const thumbnail = req.files.thumbnailImage;

        if(!thumbnail || !courseName || !courseDescription || !whatYouWillLearn || !price || !category ){
            return res.status(400).json({
                success:false,
                message : "All fields are required"
            });
        }

        //check for instructor
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);
        console.log("instructorDetails are : ",instructorDetails);
        if(!instructorDetails){
            console.log("Details not found");
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // check tag details are correct or not 

        const categoryDetails = await Category.findById(category);//here tag because in the model there is reference in the course model of the tag
         
        if(!categoryDetails){
            return res.status(403).json({
                success:false,
                message : "Tag details not found"
            });


        }

        // upload image to the cloudinary,
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category : categoryDetails._id,
            thumbnail:thumbnailImage.secure_url
        });


        await User.findByIdAndUpdate({_id : instructorDetails._id} , { $push : {courses:newCourse._id}},{new:true});

        //update the Tag schaema here

        const insertintoCategory = await Category.create({name:courseName,})




        return res.status(200).json({
            success:true,
            message : "Course created sucessfully",
            data:newCourse
        });






    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Error in creating the course ,try again"
        });
    }
}





exports.showAllCourses = async(req,res) => {
    try {


        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews :true,studentEnrolled : true}).populate('instructor').exec();


        return res.status(200).json({
            success:true,
            message : "all courses data fetched Sucessfully",
            data :allCourses
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Cannot fetch all the courses"
        });
    }
}
