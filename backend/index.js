const express = require("express");
const app = express();


const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payment");
const profileRoute = require("./routes/Profile");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const database = require('./config/database');
const cors = require('cors');
const {cloudinaryConect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3000 ; 
database.connect();


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : 'http://localhost:3000' , 
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir :'/tmp'
    })
);


cloudinaryConect();
app.use('/api/v1/auth' , userRoute);
app.use('/api/v1/course' , courseRoute);
app.use('/api/v1/payment' , paymentRoute);
app.use('/api/v1/profile' , profileRoute);


app.get('/' , (req,res) => {
    return res.status(200).json({
        success:true,
        message : "Your server is up and running..."
    });
})

app.listen( PORT , () => {
    console.log(`App is running sucessFullly on port : ${PORT}`);
    
})

