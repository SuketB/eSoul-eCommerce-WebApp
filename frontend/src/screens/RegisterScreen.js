import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { registerUser } from '../redux/store';

const RegisterScreen = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector((state) => state.user)
    const {loading,error,userInfo} = user.userRegister
    const registerHandler = (e) => {
       e.preventDefault()
       dispatch(registerUser(name,email,password))
    }

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
  return (
    <Fragment>
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1 className='text-center'>Sign Up</h1>
          <Form onSubmit={registerHandler}>
            <FormGroup className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Full Name'
                onChange={(e) => setname(e.target.value)}
              />
            </FormGroup>
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
              <Button type='submit'>Sign Up</Button>
            </div>
          </Form>
        </FormContainer>
      )}
    </Fragment>
  )
}

export default RegisterScreen