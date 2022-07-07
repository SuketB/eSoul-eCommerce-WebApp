import React, { Fragment } from 'react'
import {Container,Form,Row,Col, FormGroup, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { loginUser } from '../redux/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector((state) => state.user)
    const {loading,error,userInfo} = user.userLogin
    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(email,password))
    }
    const redirect = location.search ?  location.search.split('=')[1] : '/'
   
    useEffect(() => {
        
        if(userInfo){
          history.push(redirect)
        }
    }, [history,userInfo,redirect]);
    return (
      <Fragment>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <FormContainer>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={loginHandler}>
              <FormGroup className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  required
                  placeholder='example@gmail.com'
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  required
                  placeholder='Password'
                  onChange={(e) => setpassword(e.target.value)}
                />
              </FormGroup>
              <div className='d-grid gap-2'>
                <Button type='submit'>Login</Button>
              </div>
            </Form>
            <Row className='py-3'>
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </FormContainer>
        )}
      </Fragment>
    )
}

export default LoginScreen