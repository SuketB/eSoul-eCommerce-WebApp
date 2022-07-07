import React, { Fragment, useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  getAllOrders,
  productCreateReset,
  productDeleteReset,
} from '../redux/store'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { orders, loading, error } = useSelector(
    (state) => state.existingOrders.allOrders
  )

 

  const { userInfo } = useSelector((state) => state.user.userLogin)

 

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders())
    } else {
      history.push('/')
    }
   
  }, [dispatch, userInfo ])

  return (
    <Fragment>
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
                <th>DATE</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIEVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i class='fa-solid fa-xmark'></i>
                    )}
                  </td>
                  <td>
                    {order.isDelievered ? (
                      order.delieveredAt.substring(0, 10)
                    ) : (
                      <i class='fa-solid fa-xmark'></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='dark' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderListScreen
