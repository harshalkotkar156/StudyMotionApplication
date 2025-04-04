const User = require('../models/User');
const Otp = require('../models/Otp');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');



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
        
    } catch (error) {
        console.log("Error occured while logging in");
    }
};


//change passwprd

