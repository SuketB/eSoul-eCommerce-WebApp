import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js';

const login = asyncHandler(async (req,res) => {
    const {email,password} =req.body;
    const user = await User.findOne({email})
    if(user && await user.checkPassword(password)){
      res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
    
    res.status(401)
    throw new Error('Email/Password invalid.')
})

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    const existingUser = await User.find({email});
    if(existingUser.length !== 0){
        res.status(400)
        throw new Error('User already exists')
    }
    const user =  await User.create({name,email,password})
    if(user){
        res.json({
          _id: user._id,
          token: generateToken(user._id),
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(400)
        throw new Error('User data invalid')
    }
})

const getUserProfile = asyncHandler(async (req,res)=>{
   const user = await User.findById(req.user._id)
   if(user){
      res.json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      })
   }
   else{
    res.status(400)
    throw new Error('User not found')
   }
   
})

const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       if (req.body.password) {
         user.password = req.body.password
       }
       await user.save()
     
        res.json({
          _id: user._id,
          name:user.name,
          email: user.email,
          token: generateToken(user._id),
          isAdmin: user.isAdmin
        })
    }
    else{
      res.status(400)
      throw new Error('User not found.')
    }
})

 const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.deleteOne({ _id: id })
  if (user) {
    res.send('User deleted')
  } else {
    res.status(400)
    throw new Error("User doesn't exist")
  }
})

const getUserById = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user)
  }
  else{
    res.status(400)
    throw new Error("User doesn't exist")
  }
})

const updateUserProfileByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('User not found.')
  }
})



export const getAllUsers = asyncHandler(async (req,res) => {
  const users = await User.find()
  res.json(users)
})

export {login,getUserProfile,registerUser,updateUserProfile,deleteUser,getUserById,updateUserProfileByID}