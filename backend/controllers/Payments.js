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
        return res.status(500).json({
            success:false,
            message : "Error while verifying the signature"
        });
    }




};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  
  // enroll the student in the courses
  const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnroled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }