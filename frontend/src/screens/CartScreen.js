import React from 'react'
import { useEffect,useState } from 'react'
import { Link, useHistory,useLocation,useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart, removeItemFromCart } from '../redux/store'
import { Row,Col,Card,ListGroup,ListGroupItem, Image,Button } from 'react-bootstrap'
import Message from '../components/Message'
import { FormControl } from 'react-bootstrap'

const CartScreen = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const params = useParams()
  const id = params.id
  const qty = Number(location.search.split('=')[1])
  const cart = useSelector((state)=>state.cart.cartItems)
  const history = useHistory()

  const checkoutHandler = () => {
    history.push('/shipping')
  }

  const back = id ? `/products/${id}` : '/'
  
  useEffect(()=>{
    dispatch(addToCart(id,qty))
  },[id,qty,dispatch])
  return (
    <Row>
      <Col md={8}>
        <Row>
          <Col md={3}>
            <Link to={`${back}`} className='btn btn-light'>
              <i class='fa-solid fa-angle-left'></i> Go Back
            </Link>
          </Col>
          <Col md={9}>
            <h2 className='text-center'>Shopping Cart</h2>
          </Col>
        </Row>

        {cart.length === 0 ? (
          <Message variant='info'>Cart is empty.</Message>
        ) : (
          <ListGroup>
            {cart.map((item) => (
              <ListGroupItem>
                <Row className='m-3'>
                  <Col md={2}>
                    <Image src={`${item.image}`} fluid></Image>
                  </Col>
                  <Col md={2}>{item.name}</Col>
                  <Col md={2} className='text-center'>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <FormControl
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product_id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option
                          key={x + 1}
                          value={x + 1}
                          className='text-center'
                        >
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2} className='text-center'>
                    <Button
                      variant='light'
                      onClick={() =>
                        dispatch(removeItemFromCart(item.product_id))
                      }
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroupItem>
              {' '}
              <h2 className='text-center'>Summary</h2>
            </ListGroupItem>
            <ListGroupItem>
              Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items
            </ListGroupItem>
            <ListGroupItem>
              Total Price: $
              {cart
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <div className='d-grid gap-2'>
                <Button
                  variant='primary'
                  onClick={checkoutHandler}
                  disabled={cart.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen