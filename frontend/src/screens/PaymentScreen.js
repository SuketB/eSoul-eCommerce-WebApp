import React,{Fragment, useState} from 'react'
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutComponent from '../components/CheckoutComponent';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../redux/store';


const PaymentScreen = () => {
  
    const [paymentMethod, setpaymentMethod] = useState('Paypal');
    const shipping = useSelector((state) => state.cart.shippingAddress.address)
   
    const dispatch = useDispatch()
    const history = useHistory()
    const paymentHandler = () => {
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/place-order')
    }
   if (!shipping) {
     history.push('/shipping')
   }

  return (
    <Fragment>
      <CheckoutComponent step1 step2 step3></CheckoutComponent>
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={paymentHandler}>
          <FormGroup>
            <Form.Label>Select payment method</Form.Label>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              value='Paypal'
              name='paymentMethod'
              checked
              onChange={(e) => setpaymentMethod(e.target.value)}
            />
          </FormGroup>
          <div className='d-grid gap-2'>
            <Button variant='dark' type='submit'>
              Place Order
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Fragment>
  )
}

export default PaymentScreen