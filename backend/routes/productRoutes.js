import express from 'express'
import { addReview, createProduct, deleteProductByID, getAllProducts, getProductById, topProducts, updateProductByID } from "../controllers/productController.js"
import { authUser, isAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getAllProducts).post(authUser,isAdmin,createProduct)

router.route('/top').get(topProducts)

router.route('/:id').get(getProductById).put(authUser,isAdmin,updateProductByID).delete(authUser,isAdmin,deleteProductByID)

router.route('/:id/reviews').put(authUser,addReview)



export  default router