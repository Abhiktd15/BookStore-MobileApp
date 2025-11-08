import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/helper.js";

export const register = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        if(password.length < 6){
            return res.status(400).json({message:'Password must be at least 6 characters long'});
        }
        if(username.length < 3){
            return res.status(400).json({message:'Username must be at least 3 characters long'});
        }
        // check user already exists
        const userExists = await User.findOne({$or:[{email},{username}]});
        if(userExists){
            return res.status(400).json({message:'User with given email or username already exists'});
        }
        //get random avatar from dicebear api
        const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;
        const newUser = new User({username,email,password,profileImage});
        await newUser.save();

        // generate jwt token
        const token = generateToken(newUser._id);

        return res.status(201).json({
            message:'User registered successfully',
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                profileImage:newUser.profileImage,
            },
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'});
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'All fields are required'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials!'});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:'Invalid credentials!'});
        }
        // generate jwt token
        const token = generateToken(user._id);

        return res.status(200).json({
            message:'User logged in successfully',
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                profileImage:user.profileImage,
            },
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'});
    }
}