import axios from 'axios'
import React, { Fragment,useState,useEffect } from 'react'
import {
  Col,
  Image,
  Row,
  ListGroup,
  Card,
  ListGroupItem,
  Button,
  FormControl,
  Form,
} from 'react-bootstrap'
import { Link, useParams,useHistory } from 'react-router-dom'
import Rating from '../components/ui/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { addReview, fetchProductDetail, productReviewReset } from '../redux/store'
import Loader from '../components/Loader'
import Message from '../components/Message'
import MetaHelmet from '../components/MetaHelmet'


const ProductScreen = (props) => {
  
  const params = useParams()
  const productID = params.id

  const {product,loading,error} = useSelector((state)=>state.product.productDetail)
  
  const {userInfo} = useSelector(state=>state.user.userLogin)

  const {loading:loadingReview,success:successReview,error:errorReview} = useSelector(state=>state.product.productReview)

  const dispatch = useDispatch()
  const [qty, setqty] = useState(1);
  const history = useHistory()

  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState('');

  const addToCartHandler = () => {
    history.push(`/cart/${params.id}?qty=${qty}`)
  }
  
  const addReviewHandler = (e)=>{
   e.preventDefault()
   //add review
   dispatch(addReview({rating,comment},params.id))
  }

  useEffect(() => {
    if(errorReview){
      const timer = setTimeout(()=>dispatch(productReviewReset()),5000)
      return ()=>{
        clearTimeout(timer)
      }
    }
    if(successReview){
       dispatch(productReviewReset())
      setcomment('')
      setrating(0)

    }
   dispatch(fetchProductDetail(productID))
  }, [productID,successReview,errorReview]);

  return (
    <Fragment>
      <MetaHelmet title={product.name}></MetaHelmet>
      {loading == true ? (
        <Loader></Loader>
      ) : error != null ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Link to='/' className='btn btn-light mb-2'>
            <i class='fa-solid fa-angle-left'></i> Go Back
          </Link>
          <Row className='text-center mb-3'>
            <Col md={4}>
              <Image src={product.image} fluid alt={product.name}></Image>
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item> {product.name}</ListGroup.Item>
                <ListGroup.Item>
                  {' '}
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>{' '}
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item> {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col> ${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Stock:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 ? (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setqty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ) : null}
                  <div className='d-grid gap-2'>
                    <Button type='button' variant='dark' onClick={addToCartHandler} disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {loadingReview ? (
            <Loader></Loader>
          ) : errorReview ? (
            <Message variant='danger'>{errorReview}</Message>
          ) : null}
          <Row className='my-3'>
            <Col md={4}>
              <h2 className='mb-3'>Write A Review</h2>
              {userInfo ? (
                <Form onSubmit={addReviewHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setrating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment' className='mt-3'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <div className='d-grid gap-2 my-3'>
                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </div>
                </Form>
              ) : (
                <Message variant='info'>
                  Please{' '}
                  <Link to={`/login?redirect=/products/${product._id}`}>
                    sign in
                  </Link>{' '}
                  to write a review
                </Message>
              )}
            </Col>
            <Col md={8}>
              <h2>Reviews</h2>
              <ListGroup variant='flush'>
               
                {product.reviews && product.reviews.length === 0 ? (
                  <Message variant='info'>No Reviews</Message>
                ) : (
                  product.reviews &&
                  product.reviews.map((review, index) => (
                   
                    <ListGroupItem key={index}>
                      <strong style={{fontWeight:'800'}}>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))
                )}
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductScreen
