import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './ui/Rating'

const Product = (props) => {
  return (
    <Card className='my-3 p-3 text-center rounded'>
      <Link to={`/products/${props.product._id}`}>
        <Card.Img variant='top' src={props.product.image} />
      </Link>
      <Card.Body>
        <Card.Title as='div'>{props.product.name}</Card.Title>
        <Card.Text as='div' className='my-3'>
          <Rating
            value={props.product.rating}
            text={`${props.product.numReviews} reviews`}
          ></Rating>
        </Card.Text>
        <Card.Text as='h3'>${props.product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
