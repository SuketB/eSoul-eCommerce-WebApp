import React, { Fragment, useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { createProduct, deleteProduct, fetchAllProducts, productCreateReset, productDeleteReset } from '../redux/store'

const ProductsListScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const {pageNumber} = params

  const { products, loading, error,page,pages } = useSelector((state) => state.product.productList)

  const {success: deleteSuccess} = useSelector((state) => state.product.productDelete)

  const {newProduct,success:productCreateSuccess} = useSelector(state=> state.product.productCreate)

  const { userInfo } = useSelector((state) => state.user.userLogin)

  const deleteProductHandler = (id) => {
    //delete product
    dispatch(deleteProduct(id))
  }

  const productCreateHandler = () => {
    dispatch(createProduct())
  }
  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchAllProducts('',pageNumber))
    } else {
      history.push('/')
    }
    if(deleteSuccess){
       dispatch(productDeleteReset())
    }
    if(productCreateSuccess){
      dispatch(productCreateReset())
      history.push(`/admin/products/${newProduct._id}/edit`)
    }
    
  }, [dispatch, userInfo,deleteSuccess,productCreateSuccess,pageNumber])

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>{' '}
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <Button variant='dark' className='my-3' onClick={productCreateHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} keyword=''></Paginate>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductsListScreen