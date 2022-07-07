import React, { Fragment, useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAllProducts, getTopProducts } from '../redux/store'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductsCarousel from '../components/ProductsCarousel'
import MetaHelmet from '../components/MetaHelmet'
const Home = () => {
  const {loading, products,error,page,pages} = useSelector((state) => state.product.productList)

 

  const params = useParams()

 const keyword = params.keyword

 const pageNumber = params.pageNumber || 1
 
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(fetchAllProducts(keyword,pageNumber))
 
  }, [dispatch,keyword,pageNumber])
  return (
    <Fragment>
      <MetaHelmet title='Welcome To eSoul'></MetaHelmet>
      <h1 className='text-center'>Latest Products</h1>
      {!keyword ? (
        <ProductsCarousel></ProductsCarousel>
      ) : (
        <Link to='/' className='btn btn-light'>
          <i class='fa fa-arrow-left' aria-hidden='true'></i> Go Back
        </Link>
      )}
      {loading == true ? (
        <Loader></Loader>
      ) : error != null ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.length === 0 ? (
            <Message variant='info'>No Product Found.</Message>
          ) : (
            <Fragment>
              {products.map((product) => (
                <Col sm={12} md={6} lg={3} key={product._id}>
                  <Product product={product}></Product>
                </Col>
              ))}
              <Paginate
                keyword={keyword ? keyword : ''}
                page={page}
                pages={pages}
                isAdmin={false}
              ></Paginate>
            </Fragment>
          )}
        </Row>
      )}
    </Fragment>
  )
}

export default Home
