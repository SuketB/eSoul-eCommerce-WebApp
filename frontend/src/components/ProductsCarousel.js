import React, { Fragment, useEffect } from 'react'
import { Carousel,CarouselItem,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTopProducts } from '../redux/store'
import Loader from './Loader'
import Message from './Message'

const ProductsCarousel = () => {

     const {
       loading,
       error,
       products,
     } = useSelector((state) => state.product.topProduct)

     const dispatch = useDispatch()

     useEffect(() => {
       dispatch(getTopProducts())
     }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Carousel pause='hover' className='bg-dark'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Fragment>
  )
}

export default ProductsCarousel