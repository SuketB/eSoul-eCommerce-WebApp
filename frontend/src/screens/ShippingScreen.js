import React,{useState,useEffect, Fragment} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutComponent from '../components/CheckoutComponent';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux/store';

const ShippingScreen = () => {
    const shippingAddress = useSelector((state)=>state.cart.shippingAddress)
    const [address, setaddress] = useState(shippingAddress.address);
    const [city, setcity] = useState(shippingAddress.city);
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
    const [country, setcountry] = useState(shippingAddress.country);
    const dispatch = useDispatch()
    const userInfo = useSelector((state)=>state.user.userLogin.userInfo)
    const history = useHistory()

    const shippingHandler = (e) => {
        e.preventDefault()
      dispatch(saveShippingAddress({
        address,city,postalCode,country
      }))
      history.push('/payment')
    }

    if (!userInfo) {
      history.push('/login?redirect=/cart')
    }

   

  return (
    <Fragment>
      <CheckoutComponent step1 step2></CheckoutComponent>
      <FormContainer>
        <h1>Shipping Screen</h1>
        <Form onSubmit={shippingHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              required
              onChange={(e) => setaddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              value={city}
              required
              onChange={(e) => setcity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalcode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Postal Code'
              value={postalCode}
              required
              onChange={(e) => setpostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Country'
              value={country}
              required
              onChange={(e) => setcountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button type='submit' variant='dark'  >
              Proceed To Payment
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Fragment>
  )
}

export default ShippingScreen