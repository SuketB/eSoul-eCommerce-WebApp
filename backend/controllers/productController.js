import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getAllProducts = asyncHandler(async (req, res) => {
 
  const page = Number(req.query.page) || 1
  const pageSize = 10;
  
   const keyword = req.query.keyword 
     ? {
         name: {
           $regex: req.query.keyword,
           $options: 'i',
         },
       }
     : {}
  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  const pages = Math.ceil(count/pageSize)
  res.json({products,page,pages})
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

const deleteProductByID = asyncHandler(async (req,res)=>{
  const deletedProduct = await Product.deleteOne({_id: req.params.id})
  if(deletedProduct){
    res.send("Product deleted")
  }
  else{
    res.status(400)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req,res)=>{
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  if(createdProduct){
    res.json(createdProduct)
  }
  else{
    res.status(400)
    throw new Error("Can't create product.")
  }
})

const updateProductByID = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    
    description,
  } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
  
    product.description = description

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(400)
    throw new Error('Product not found.')
  }
}) 

export const addReview = asyncHandler(async (req,res) => {
  const {rating, comment} = req.body;
  const productID = req.params.id
  const product = await Product.findById(productID)
  if(product){
     const alreadyReviewed = product.reviews.find((review)=> review.user.toString() === req.user._id.toString())
     if(alreadyReviewed){
       res.status(400)
       throw new Error('Product already reviewed.')
     }
     else{
      const newReview = {
        name: req.user.name,
        rating,
        comment,
        user: req.user._id
      }
      product.reviews.push(newReview)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
     }
  }
  else{
    res.status(400)
    throw new Error('Product not found.')
  }
})

export const topProducts = asyncHandler(async (req,res) => {
  console.log("sdada");
  const products = await Product.find({}).sort({rating: -1}).limit(3)

  res.json(products)
})

export {getAllProducts,getProductById,createProduct,updateProductByID,deleteProductByID}