const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const  mailSender = require("../utils/mailSender");
 
exports.resetPasswordToken = async(req,res) =>{

    try {
        
        const {email}= req.body;

        const user = await User.findOne({email});

        console.log(`"user is : ${user}`);

        if(!user) {
            return res.json({
                success : false,
                message : "Your Email is Not registered with us"
            }); 
        }


        const token = crypto.randomUUID();

        console.log("token generated :",token);


        const updatedDetails = await User.findOneAndUpdate({email :email},{token : token , resetPasswordExpires:Date.now() + 5 * 60 *1000},{new:true});



        //generate the link for resetting the pass
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email,`Password reset link`,`Password Reset link ${url}`);

        return res.status(200).json({
            success:true,
            message:"Email sent SucessFully, please check mail and change password"
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message : "error in Sending the reset link"
        })
    }
}



exports.resetPassword = async(req,res) => {

    try {
        
        const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
    } catch (error) {
        console.log("error occcured ", error);
        return res.status(500).json({
            success:false,
            message:"Password Cannot be changed"
        });
    }

}