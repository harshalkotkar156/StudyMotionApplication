const {instance} = require("../config/razorpay");
const Course  = require("../models/Course");
const User  = require("../models/User");
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const Razorpay = require("razorpay");
const {mongoose } = require("mongoose");
require('dotenv').config();



// capture the paymant and initiate the Razorpay order 

exports.capturePayment = async(req,res) => {

    const {courseId} = req.body;
    const userId = req.user.id;

    if(!courseId ){
        return res.status(402).json({
            success:false,
            message : "FIll all the details"
        });

    }


    let course;
    try {

        course = await Course.findById(courseId);
        if(!course){
            return res.status(402).json({
                success:false,
                message : "Could not find the course"
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);


        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message : "Student is already enrolled "
            });
        }

        const amt = course.price;
        const currency = "INR";

        const options = {
            Amount :amt *100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
                courseId :courseId,
                userId
            }
        };
         
        try {
            
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success:true,
                message : "Sucessfully payment is initiated",
                courseName : course.name,
                courseDescription : course.courseDescription,
                thumbnail : course.thumbnail,
                orderId : paymentResponse.id,
                currency : paymentResponse.currency,
                amount : paymentResponse.amount,


            });

        } catch (error) {
            console.log("Error occurs while initiating the paymant");
            return res.status(500).json({
                success:true,
                message : "Error occur while creating request"
            });
        }
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message : "Error occured while making payment"
        });
    }
}



// verify signature of razorpay and server 

exports.verifySignature = async(req,res) => {

    // server ka secret 
    try {
        
        const webHookSecret = process.env.WEBHOOK_SECRET;

        // this is from the razorpay server 
        const signature = req.headers["x-razorpay-signature"];

        const shaSum = crypto.createHmac("sha256" , webHookSecret);// h mac object
        //convert it into string
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest('hex');

        if(signature === digest) {
            console.log("Payment is authorized");

            const {courseId , userId } = req.body.payload.payment.entity.notes;
            try {
                
                // find  the course and enroll the student 
                const enrolledCourse = await Course.findOneAndUpdate({_id:courseId} , {$push :{ studentEnrolled : userId}} , {new:true});

                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message : "Course NOT found"
                    });
                    
                }

                console.log(enrolledCourse);

                // find the student and enroll the course in it 
                const enrollStudent = await User.findOneAndUpdate({_id: userId} , {$push : {courses:courseId}} , {new:true});

                if(!enrollStudent){
                    return res.status(500).json({
                        success:false,
                        message : "User not found"
                    });
                }


                const emailResponse = await mailSender(
                                                        enrollStudent.email,
                                                        "Congratulations from Harsh",
                                                        "You are enrolled in course"
                                  
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message : "Signature verifies and course added"
                });


            } catch (error) {
                
                return res.status(402).json({
                    success:false,
                    message : ""
                });
            }

        }


        // signature not matched 
        return res.status(400).json({
            success:false,
            message : "Invalid request"
        });




    } catch (error) {
        
    }




};