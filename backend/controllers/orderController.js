import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js';


export const saveOrder = asyncHandler(async (req, res) => {
   const {cartItems, shippingAddress, taxPrice,shippingPrice,totalPrice,paymentMethod} = req.body;
  
   if(cartItems.length === 0){
    res.status(400)
    throw new Error('Cart is empty.')
   }
   else{
   
    const order =  new Order({
      orderItems: cartItems,
      
      shippingAddress,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
      user: req.user._id
    })
    
    const savedOrder = await order.save()
   
    res.json(savedOrder)
   }
})


export const getOrder = asyncHandler(async (req,res) => {
  const {id} = req.params
  
  const userId = req.user._id
  
  const order = await Order.findById(id)
  if(order && (userId.toString() === order.user.toString() || req.user.isAdmin)){
    res.json(order)
  }
  else{
    res.status(400)
    throw new Error('Order not found.')
  }
})

export const markOrderPaid = asyncHandler(async (req,res) => {
  const {id} = req.params
  const data = req.body
  const order = await Order.findById(id);
  if(order){
     order.isPaid = true
     order.paidAt = Date.now()
     order.paymentResult = {
       id: data.id,
       status: data.status,
       update_time: data.update_time,
       email_address: data.payer.email_address,
     }
     const updatedOrder = await order.save()
     res.json(updatedOrder)
  }
  else{
    res.status(400)
    throw new Error('Order not found.')
  }
 
})

export const getAllOrdersOfAUser = asyncHandler(async (req,res) => {
  const orders = await Order.find({user:req.user._id}).populate('user')
  if(orders){
    res.json(orders)
  }
  else{
    res.status(400)
    throw new Error('No orders yet.')
  }
})

export const getAllOrders = asyncHandler(async (req,res) => {
  const orders = await Order.find()
  res.json(orders)
})

export const markOrderDelievered = asyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)
  if (order) {
    order.isDelievered = true
    order.delieveredAt = Date.now()
    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  } else {
    res.status(400)
    throw new Error('Order not found.')
  }
})


