import { Link, useParams } from 'react-router-dom'
import {
    editProduct,
    fetchProductDetail,
  getUserDetails,
  productEditReset,
  resetUserUpdateByAdminDelete,
  updateUserByID,
} from '../redux/store'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'


const ProductEditScreen = () => {
  const [name, setname] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDesscription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading,setUploading] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { id: productID } = params

  const user = useSelector((state) => state.user)
  const { userInfo } = user.userLogin

  const {
    loading,
    error,
    product: productDetails,
  } = useSelector((state) => state.product.productDetail)

  const {
    loading: loadingEdit,error: errorEdit, success: successEdit
  } = useSelector(state => state.product.productEdit)

  
  const productEditHandler = (e) => {
    e.preventDefault()
    //update product
    dispatch(editProduct({
        name,image,price,brand,category,description,countInStock
    },productID))
  }

  const imageUploadHandler = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image',image)
    setUploading(true)
    try {
        const config = {
            Headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/upload',formData,config)
        setImage(data)
        setUploading(false)
    } catch (error) {
        console.log(error);
        setUploading(false)
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      //get user details
      if (!productDetails || productDetails._id != productID) {
        dispatch(fetchProductDetail(productID))
      } else {
        setname(productDetails.name)
        setImage(productDetails.image)
        setBrand(productDetails.brand)
        setCategory(productDetails.category)
        setCountInStock(productDetails.countInStock)
        setDesscription(productDetails.description)
        setPrice(productDetails.price)
      }
    } else {
      history.redirect('/')
    }
    if(successEdit){
        dispatch(productEditReset())
        history.push('/admin/products')
    }
  }, [history, userInfo, productDetails,successEdit])
  return (
    <Fragment>
      <Link to='/admin/products' className='btn btn-light my-3'>
        <i class='fa fa-arrow-left' aria-hidden='true'></i> Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingEdit ? (
            <Loader></Loader>
          ) : errorEdit ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={productEditHandler}>
              <FormGroup controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Full Name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='brand'
                  placeholder='Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <Form.Control
                  type='file'
                  
                  label='Choose Product Image'
                  name='image'
                  onChange={imageUploadHandler}
                />
                {uploading && <Loader></Loader>}
              </FormGroup>
              <FormGroup controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Available In Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDesscription(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <div className='d-grid gap-2'>
                <Button type='submit' variant='dark'>
                  Done
                </Button>
              </div>
            </Form>
          )}
        </FormContainer>
      )}
    </Fragment>
  )
}

export default ProductEditScreen