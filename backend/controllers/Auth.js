const User = require('../models/User');
const Otp = require('../models/Otp');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendotp
exports.sendOtp = async (req,res) => {
    try {
        
        const {email } = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message : "User Already Registered"
            });
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        });
        console.log("Otp genrated is : ",otp);
        let result = await Otp.findOne({otp : otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false
            });

            result =await Otp.findOne({otp: otp});
        }



        const otpPayload ={email,otp};

        //add in db
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        res.status(200).json( {
            success:true,
            message:"OTP Sent Successfully",
            otp
        });



          
    } catch (error) {
        console.log("Error occur while adding OTP" , error);

        return res.status(500).json({
            success:false,
            message : "user not registered" 
        })

    }



}

//signup

exports.signUp = async(req,res) => {

    // data fetch
    // then validate data 
    // 2 no passswoard check krlo
    // check user already exist 
    try {
        
        const {firstName,lastname,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;

        if(!firstName || !lastname || !email || !password || !confirmPassword || !contactNumber || !otp ){
            return res.status(403).json({
                success:false,
                message:"All fileds are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and ConfirmPassword values not match, try again!"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return  res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }


        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);

        console.log("RecentOtp is : ",recentOtp);

        if(recentOtp.length == 0){
            return res.status(400).json({
                success : false,
                message : 'OTP NOT Found'
            })
        }else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }

        // hash the pass 
        const hashedPass = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({
            gender:null,
            dateofBirth :null,
            about:null,
            contactNumber:null
        })
        const user = await Profile.create({
            firstName,
            lastname,
            email,
            contactNumber,
            password:hashedPass,
            accountType,
            additionalDetails:profileDetails._id ,
            image : `https://api.dicebear.com./5.x/initials/svg?seed=${firstName} ${lastname}`
        });
         

        return res.status(200).json({
            success:true,
            message:"User is registered SucessFully",
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered ! Plz try again"
        });
    }






};


//login


exports.login = async(req,res) => {


    try {

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Fill all details"
            });

        }

        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User is not registered"
            });
        }

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            user.token= token;
            user.password=undefined;
            const options = {
                expiresIn:new Date.now() + 3*24*60*60*1000,
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in sucessFully"
            });

        }else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            });
        }

    } catch (error) {
        console.log("Error occured while logging in");
        return res.status(500).json({
            success:false,
            message:"Login Failed, Try again"
        })
    }

};


//change password

exports.changePassword =async(req,res) => {

    try {

        const {email,password,newPassword,confirmPassword} = req.body;

        if(!email || !password || !newPassword || !confirmPassword){
            
            return res.status(403).json({
                success:false,
                message:"Fill all the details"
            });
        }

        if(newPassword === confirmPassword){
            const hashedPass = await bcrypt.hash(newPassword,10);
            const isPassChanged = await User.updateOne({email:email,password:hashedPass})
            if(isPassChanged){
                return res.status(200).json({
                    success:true,
                    message:"Password change SucessFully"
                });
            }else{
                return res.status(403).json({
                    success:false,
                    message:"Error in password changing"
                });
            }
        }
        return res.status(403).json({
            success:false,
            message:"Password NOT Match"
        })
        
    } catch (error) {
        
        console.log("Error occured in while password changing",error);

        return res.status(500).json({
            success:false,
            message :"Error in changing password, Try again"
        })
    }
}

