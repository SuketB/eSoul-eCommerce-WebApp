import React, { Fragment,useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CheckoutComponent from '../components/CheckoutComponent'
import Message from '../components/Message'
import { placeOrder } from '../redux/store'

const PlaceOrderScreen = () => {

    const {shippingAddress, cartItems,paymentMethod} = useSelector((state)=>state.cart)
    const history = useHistory()
    const dispatch = useDispatch()

    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    if(!paymentMethod){
        history.push('/payment')
    }
    else if(!shippingAddress.address){
        history.push('/shipping')
    }

    //calculate prices;
    const itemsPrice = cartItems.reduce((acc,item) => acc +item.qty*item.price,0).toFixed(2)
    let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    
    let taxPrice = addDecimals(Number(itemsPrice * 0.15))
    
    let totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))
    
    const {error,success,data} = useSelector((state)=>state.order)
    const state = useSelector(state=>state)
    console.log(state);
    const placeOrderHandler = (e) => {
        e.preventDefault()
        dispatch(placeOrder({
            cartItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    useEffect(() => {
       if(success){
        history.push(`/orders/${data._id}`)
       }
    }, [success]);

  return (
    <Fragment>
      <CheckoutComponent step1 step2 step3 step4></CheckoutComponent>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant='info'>Cart is empty.</Message>
          ) : (
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  Address: {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h2>Payment Method</h2>
                <p>Method: {paymentMethod}</p>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroup variant='flush'>
                  {cartItems.map((item,index) => {
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
                            {item.qty} x {item.price} = {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='p-3'>
            <h2 className='text-center'>Order Summary</h2>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Items Price</Col>
                  <Col>{itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>{taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Price</Col>
                  <Col>{totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className='d-grid gap-2'>
                  <Button
                    variant='dark'
                    type='submit'
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PlaceOrderScreen