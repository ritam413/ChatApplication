import chalk from 'chalk'
import User from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import {uploadResultonCloudinary} from '../utils/cloudinary.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from '../utils/generateJWTtokens.js';
import jwt from "jsonwebtoken"
import {ACCESS_TOKEN_SECRET} from '../envVariables.js'
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body

        //? To check if everything is coming nicely form the front end
        console.log(chalk.blueBright(`username: ${username}
            \t Fullname: ${fullname} 
            \t Password: ${password} 
            \t Confirm Password: ${confirmPassword} 
            \t Gender: ${gender}`));

        //? Checking if Every field is Given
        if ([fullname, username, password, confirmPassword, gender].some((field) => typeof field !== 'string' || field.trim().length === 0)) 
            return res.status(400).json({ message: 'All fields are required' })

        //? Checking if Password and Confirm Password Match
        // if (password !== confirmPassword) 
        //     return res.status(400).json({ message: 'Passwords do not match' })

        //? User Eistence Check 
        const existedUser = await User.findOne({
             username: username 
        })
        if (existedUser) {
            console.log(chalk.yellowBright('User already exists'));
            return res.status(400).json({ message: 'User already exists' })
        }

        //!Hash Password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //!getting the localpath in string format via multer 
        const avatarLocalPath = req.file
        console.log(req.file)
        console.log('Uploaded file path:', avatarLocalPath?.path);
        
        //! Uploading ProfilePic either ( cloudinary or Default-API ) && then uploadin profile Picture
        let profilepic
        try {
            //!uploading avatar to clouidnary
            const uploadResult = avatarLocalPath?.path
                ? await uploadResultonCloudinary(avatarLocalPath.path)
                : null;

            console.log(chalk.cyanBright("Upload Result", uploadResult))

            //? deciding what resonse to send according to uploadResult (if upload result is PRESENT, then send it, else send the default avatar)
            if(!uploadResult){
                if(gender === "male"){
                    profilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                }else{
                    profilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`
                }
                console.log(chalk.italic.bold.greenBright("Upload Success!!!, User Created"))
            }else{
                profilepic = uploadResult    
                console.log(chalk.italic.bold.greenBright("Upload Success!!!, User Created"))
            }
            // profilepic = uploadResult?.secure_url
            //     ? uploadResult
            //     : gender === "male"
            //         ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            //         : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        } catch (error) {
            console.log('Error uploading avatar to cloudinary', error)
            return res.status(500).json({ message: 'Error uploading avatar to cloudinary' })
        }
        
        //! Creating New User
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic
        })

        if(newUser){
            //! Generate JWT Token
            generateTokenAndSetCookie(newUser._id, res)

            //! Saving New user
            await newUser.save()
    
            const userWithoutPassword = await User.findById(newUser._id).select('-password');
            const token = jwt.sign({_id:newUser._id},ACCESS_TOKEN_SECRET,{expiresIn:'7d'},)
            res.status(201).json({ 
                message: 'User created successfully' ,
                data:userWithoutPassword,
                token   
            })
        }else{
            res.status(400).json({ message: 'Invalid User Data' })
        }


    } catch (error) {
        console.log('Error Registering User', error)
        res.status(500).json({ message: 'Error Registering User' })
    }
}
)

const loginUser = async (req, res) => {
    //? res.send('Login user');
    console.log(req.body);
    try {
        const {username,password}=req.body
        //? console.log(chalk.magenta(`Username: ${username}, Password: ${password}`))

        const user = await User.findOne({ username: username })
        //? console.log(chalk.blue(`User: ${user}`))


        if(!user){
            return res.status(400).json({ message: 'Invalid username, USER NOT FOUND ' })
        }
        //? console.log(chalk.green(`User: ${user}`))
        
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        //? console.log(chalk.green(`isPasswordCorrect: ${isPasswordCorrect}`))


        if(!isPasswordCorrect){
            return res.status(400).json({ message: 'Invalid Password ' })
        }

        generateTokenAndSetCookie(user._id, res)
        const token = jwt.sign({ _id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'User logged in successfully',
        data:user,
        token:token
        })

    } catch (error) {
        console.log('Error Login in Login Controller', error)
        res.status(500).json({message: 'Error Login User'})
    }
}

const logoutUser =  (req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: 'User logged out successfully' })
   } catch (error) {
    console.log('Error in Logout Controller', error)
    res.status(500).json({message: 'Error Logout User'})
   }
}

const welcomeUser = (req, res) => {
    res.send('Welcome user');
}
export { loginUser, logoutUser, registerUser, welcomeUser }