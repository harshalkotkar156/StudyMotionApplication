const cloudinary = require('cloudinary');


exports.uploadImageToCloudinary = async(file,folder,height,quality) => {
    try{
        const options =  {folder};

        if(height){
            options.height = height;
        }
        if(quality){
            options.quality = quality;
        }
        options.resource_type = "auto";
        
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    }catch(err){
        console.log("Error in uploading to Clouinary");

        return res.status(500).json({
            success:false,
            message : "Uploading to Cloudianry is Failed"
        });
    }
    
}