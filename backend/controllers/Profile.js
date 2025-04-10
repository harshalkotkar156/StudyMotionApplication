const User = require('..//models/User');
const Profile = require('..//models/Profile');


exports.updateProfile = async(req,res) =>{

    try{

        const {dateofBirth="" , about="",contactNumber ,gender} = req.body;
        const id = req.user.id;
        
        if(!id || !contactNumber || !gender ){
            return res.status(402).json({
                success:false,
                message : "All fields are required"
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        profileDetails.dateofBirth= dateofBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        profileDetails.about = about;

        await profileDetails.save();


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