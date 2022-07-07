import express from 'express'
import {login,getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUserProfileByID} from '../controllers/userController.js'
const router = express.Router()
import {authUser, isAdmin} from '../middleware/authMiddleware.js' 


router.route('/login').post(login)

router.route('/profile').get(authUser ,getUserProfile).put(authUser,updateUserProfile)

router.route('/').get(authUser,isAdmin,getAllUsers).post(registerUser)

router.route('/:id').get(authUser,isAdmin,getUserById).put(authUser,isAdmin,updateUserProfileByID).delete(authUser,isAdmin,deleteUser)

export default router
