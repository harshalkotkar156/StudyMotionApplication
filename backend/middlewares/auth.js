const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

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

            const decode = await jwt.verify(token,process.env.JWT_SECRET);
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