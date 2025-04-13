const User = require('..//models/User');
const Profile = require('..//models/Profile');
const uploadImageToCloudinary = require('../utils/ImageUploader');

exports.updateProfile = async(req,res) =>{

    try{

        const {dateOfBirth="" , about="",contactNumber ,gender} = req.body;
        const id = req.user.id;
        
        if(!id || !contactNumber || !gender ){
            return res.status(402).json({
                success:false,
                message : "All fields are required"
            });
        }

        const userDetails = await User.findById(id);
        console.log(`User details are: ${userDetails}`);
        const profileId = userDetails.additionalDetails;
        console.log(`Profile Id: ${profileId}`);
        const profileDetails = await Profile.findById(profileId);


        profileDetails.dateOfBirth= dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        profileDetails.about = about;

        await profileDetails.save();

        console.log(`Final ProfileDetails : ${profileDetails}`);


        return res.status(200).json({
            success:true,
            message : "Profile details saved/ updated sucessfully",
            profileDetails

        });
        // const updateProfileDetails = 


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message : "Error occured while updating profile"
        });
    }
}




exports.deleteAccount = async(req,res) => {

    try {


        const id = req.user.id;
        const userDetails  = await User.findById(id);
        if(!userDetails){
            return res.status(402).json({
                success:false,
                message : "User Not found"
            });
        }

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});
        await User.findByIdAndDelete({_id : id});

        //hw when student deleted then also delete from inroleed in any course count and that
         
        return res.status(200).json({
            success:true,
            message : "User deleted Successfully"
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Error occured while deleting profile"
        });
    }
}




 
exports.getAllUserDetails = async(req,res) => {

    try {
        
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message : "User data fetched sucessfully"
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Error occured while fetching details"
        });

    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log('image is : ', image);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate('additionalDetails').exec();
    console.log("Updated details are : ",updatedProfile);
    return res.status(200).json({
      success: true,
      message: "Image Uploaded successfully",
      data: updatedProfile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occurred while changing the profile: ${error.message}`,
    });
  }
}

  
  exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  exports.instructorDashboard = async (req, res) => {
    try {
  
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnroled.length;
        const totalAmountGenerated = totalStudentsEnrolled * course.price;
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }