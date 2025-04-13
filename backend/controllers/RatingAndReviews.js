const mongoose= require('mongoose');
const Course = require('../models/Course');
const RatingandReviews = require('../models/RatingandReviews');




exports.createRating = async (req,res) => {
    try {
    
        const userId = req.user.id;

        const {rating,review,courseId} = req.body;

        const courseDetails = await Course.findOne({_id : courseId , studentEnrolled: {$eleMatch : {$eq:userId}}});

        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message : "User is registerd for the course",
            });
        }

        const allreadyReviewed = await RatingandReviews.findOne({user:userId, course:courseId});

        if(allreadyReviewed) {
            return res.status(402).json({
                success:false,
                message : "User already had added the review"
            });
        }

        // adding the review and the rating 
        const ratingReview  = await RatingandReviews.create({rating,review,course : courseId , user:userId});

        const updatedCourseDetails  = await Course.findByIdAndUpdate({_id:courseId} , {
            $push:{
                ratingAndReviews : ratingReview._id,
            } 
        },{new:true});

        console.log(updatedCourseDetails);



        return res.status(200).json({
            success:true,
            message : "Rating and Reviews added sucessfully",
            ratingReview,
        });




    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "Error while creating the rating and review"
        });
    }
}


//getAverage rating : 


exports.getAverageRating = async(req,res) =>  {

    try {
        const courseId = req.body.courseId;

        const result = await RatingandReviews.aggregate([
            {
                $match : {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group :{
                    _id:null,
                    averageRating : { $avg :"$rating"},
                }
            }
        ]);

        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                message : "Average rating calculated",
                averageRating : result[0].averageRating
            });
        }



        // if no rating available 

        return res.status(200).json({
            success:true,
            message : "No rating & reviews exist for the course",
            averageRating:0
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Error occurs while fetching  reviews and rating"
        });
    }

}


exports.getAllRating = async(req,res) => {

    try {
        
        const allReviews = await RatingandReviews.find({}).sort({rating:"desc"}).populate({ path:"user" , select:"firstName lastName email image"}).populate({ path :"course" , select :'courseName'}).exec();


        return res.status(200).json({
            success:true,
            message : "all reviews and rating fetched sucessfully" , 
            data : allReviews
        });



    } catch (error) {
        console.log("eror occur while fetching all reviews and rating");
        
        return res.status(500).json({
            success:false,
            message : "Error occurs while fetching all reviews and rating"
        });
    }
}