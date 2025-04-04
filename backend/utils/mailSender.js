const nodemailer = require("nodemailer");
require('dotenv').config();



const mailSender = async(email,tilte , body ) => {

    try{

        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user :process.env.MAIL_USER,
                pass:process.env.MAIL_PASS 
            }
        });

        let info = await transporter.sendMail({
            from : "StudyNotion || Harshal  -AIMERS",
            to : `${email}`,
            subject :`${title}`,
            html : `${body}`
        });
        console.log(info);

        return info;




    }catch(err){
        console.log("Error Occured in mailSender UTIL :  ",err.message);
    }
}