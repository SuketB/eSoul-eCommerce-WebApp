import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const authUser = asyncHandler(async (req,res,next) => {
   var token = req.headers.authtoken
   
   if(token && token.startsWith('Bearer')){
    token = token.split(' ')[1]
    try {
        const decodedToken =  jwt.verify(token,process.env.JWT_SECRET)
        const id = decodedToken.id
        req.user = await User.findById(id).select('-password')
        next()
    } catch (error) {
        res.status(400)
        throw new Error('Not Authorized')
    }
   }
   else{
   
    res.status(400)
    throw new Error('Not Authorized.')
   }
  
})

export const isAdmin = (req,res,next) => {
  
  if(req.user && req.user.isAdmin){
    next()
  }
  else{
    res.status(403)
    throw new Error('Not authorized')
  }
}

