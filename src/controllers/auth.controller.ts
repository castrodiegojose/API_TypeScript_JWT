import { Request, Response } from "express"
import User, {IUser} from "../models/user"
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) =>{
    // saving user //
    const user: IUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    user.password = await user.encryptPassword(user.password)
    const savedUser = await user.save();
    
    // token
    const token:string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokenwhatever')
    res.header('auth-token', token).json(savedUser)
}

export const signin = async (req: Request, res: Response) =>{

    // check User
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('Email is wrong');
    //check Password
    const correctPass: boolean = await user.validatePassword(req.body.password)
    if(!correctPass) return res.status(400).json('Password is wrong');

    //token
    const token:string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'tokenwhatever', {
        expiresIn: 60 * 60 * 24
    })
    res.header('auth-token', token).json(user);
}

export const profile = async (req: Request, res: Response) =>{
    const user = await User.findById(req.userId, { password: 0 })
    if(!user) return res.status(404).json("no User found")
    res.json(user)
}