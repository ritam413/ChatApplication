import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import  {CLOUDINARY_API_SECRET,CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME} from '../envVariables.js'
import chalk from 'chalk'

// console.log(chalk.magenta(`${CLOUDINARY_CLOUD_NAME}`,`${CLOUDINARY_API_KEY}`,`${CLOUDINARY_API_SECRET}`))

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})

const uploadResultonCloudinary = async(localFilePath)=>{
    try{
            if(!localFilePath) return null;

            //!upload result on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })

            //* for my knoledge
                //? console.log(`Response of cloudinary : ${JSON.stringify(response,null,2)}`);

            if(!response) return null;

            //? file Upload Succesfully
            console.log(`File uploaded on cloudinary with URL : ${response.secure_url}`);

            //! write the deletion logic of the files
            fs.unlinkSync(localFilePath)
            console.log(`File is deleted from temp: ${localFilePath}`);

        return response.secure_url;
    }catch(error){
        console.log("Cloudinary Upload Error: ",error)

        //! deletion logic
        fs.unlinkSync(localFilePath);

        return null;
    }
}

export {uploadResultonCloudinary}