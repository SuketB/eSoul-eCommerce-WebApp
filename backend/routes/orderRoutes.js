import express from 'express'
import { getAllOrders, getAllOrdersOfAUser, getOrder, markOrderDelievered, markOrderPaid, saveOrder } from '../controllers/orderController.js'
import {authUser, isAdmin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(authUser, saveOrder).get(authUser, getAllOrdersOfAUser)

router.route('/all').get(authUser,isAdmin,getAllOrders)

router.route('/:id').get(authUser,getOrder)

router.route('/:id/pay').put(authUser, markOrderPaid)

router.route('/:id/delievered').put(authUser, isAdmin,markOrderDelievered)


export default router