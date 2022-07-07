import React, { Fragment,useState, useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { delieverOrder, getOrderDetails, orderDelieverdReset, orderPayReset, payOrder } from '../redux/store';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'

const OrderScreen = () => {
    
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    const {id:orderId} = params
    
    const {userInfo} = useSelector(state=>state.user.userLogin)
    

    const { loading, error, data } = useSelector(
      (state) => state.existingOrders.orderDetails
    )
    const {success:successPay,loading:loadingPay} = useSelector(
        state => state.existingOrders.orderPay
    )
    
    const { loading: loadingDeliever, success: successDeliever } = useSelector(
      (state) => state.existingOrders.orderDelieverd
    )

    const itemsPrice = data.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
   
   

    useEffect(() => {
      if (!userInfo) {
        history.pushState('/login')
      }
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypalID')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      if (!data._id || successPay || successDeliever || data._id != orderId) {
        dispatch(orderPayReset())
        dispatch(orderDelieverdReset())
        dispatch(getOrderDetails(orderId))
      } else if (!data.isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }, [orderId, getOrderDetails, dispatch, successPay, data, successDeliever])
    
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
      dispatch(payOrder(orderId,paymentResult))
    }

    const delieveredHandler = (id) =>{
      dispatch(delieverOrder(id))
    }

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : error != null ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <h1>Order ({data._id})</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    Address: {data.shippingAddress.address},{' '}
                    {data.shippingAddress.city},{' '}
                    {data.shippingAddress.postalCode},{' '}
                    {data.shippingAddress.country}
                  </p>
                  {data.isDelievered ? (
                    <Message variant='success'>
                      Delievered at {data.delieveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not delievered yet.</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>Method: {data.paymentMethod}</p>
                  {data.isPaid ? (
                    <Message variant='success'>
                      Paid at {data.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not paid yet.</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroup variant='flush'>
                    {data.orderItems.map((item, index) => {
                      return (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                fluid
                                alt={item.name}
                                rounded
                              ></Image>
                            </Col>
                            <Col>
                              <Link
                                to={`/products/${item.product_id}`}
                                className='text-d-n'
                              >
                                {item.name}
                              </Link>
                            </Col>
                            <Col>
                              {item.qty} x {item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )
                    })}
                  </ListGroup>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className='p-3'>
                <h2 className='text-center'>Order Summary</h2>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Items Price</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${data.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${data.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${data.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  {!data.isPaid && !userInfo.isAdmin && (
                    <ListGroupItem>
                      {loadingPay && <Loader></Loader>}
                      {!sdkReady ? (
                        <Loader></Loader>
                      ) : (
                        <PayPalButton
                          amount={data.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      )}
                    </ListGroupItem>
                  )}
                  
                  {!data.isDelievered && userInfo.isAdmin && (
                    <ListGroupItem>
                      <div className='d-grid gap-2'>
                        <Button
                          variant='dark'
                          onClick={() => delieveredHandler(data._id)}
                        >
                          Mark As Delieverd
                        </Button>
                      </div>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderScreen