const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();



//auth
exports.auth = async (req,res,next) => {

    try {
        
        const token= req.cookies.token || req.body.token || req.header("Authorisation").replace('Bearer ',"");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is Missing"
            })
        }

        try{

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;

        }catch(err){

            return res.status(401).json({
                success:false,
                message: "token is Invalid"
            });

        }

        next();



    } catch (error) {
        console.log("Error in authenticating");
        return res.status(401).json({
            success:false,
            message: "Something wrong while validating the user"
        });

    }
};

// isStudent 

exports.isStudent = async(req,res,next) => {

    try {

        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Student"
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}


// isInstructor 

exports.isInstructor = async(req,res,next) => {

    try {
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Instructor"
            });
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}


// isAdmin

exports.isAdmin = async(req,res,next) => {

    try {
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Admin"
            });
        } 
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be verified"
        })
    }
}












