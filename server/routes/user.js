import express from 'express';
import bcrypt from 'bcrypt';
import {User} from "../models/User.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) =>{
    console.log(req.body);
    const { firstName,
        lastName, email, password } = req.body;
    const user = await User.findOne({email})
    if(user) {
        return res.json({message: "User already exists"})
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({status: true, message: "User created successfully"})

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.json({status: false, message: "User does not exist"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({status: false, message: "Password does not match"})
    }

    const token = jwt.sign({email: user.email}, process.env.KEY, {expiresIn: '1h'});
    res.cookie('token', token, {
        maxAge: 360000,
        httpOnly: true
    })

    return res.json({status: true, message: "User logged in successfully"})
});

export {router as UserRouter}