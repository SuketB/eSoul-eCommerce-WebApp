import { getMyOrders, getUserDetails, updateUserProfile, userUpdateReset } from '../redux/store'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, FormGroup,Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setmessage] = useState(null);
  const dispatch = useDispatch()
  const history = useHistory()
  const userInfo = useSelector((state)=>state.user.userLogin.userInfo)
   
  
  const {loading,error,userInfo:user} = useSelector((state)=>state.user.userDetails)

  const {loading: orderLoading,error: orderError,orders} = useSelector(state => state.existingOrders.myOrders)

  const {success} = useSelector((state)=>state.user.userUpdateDetails)
  
  const updateProfileHandler = (e) => {
    e.preventDefault()
    if(password != confirmPassword){
        setmessage("Passwords don't match")
    }
    else{
        dispatch(updateUserProfile({name,email,password}))
        setmessage(null)
    }
  }
  useEffect(() => {
    if(!userInfo){
       history.push('/login')
    }
    else{
        if(!user){
            dispatch(getMyOrders())
            dispatch(getUserDetails('profile'))
        }
        else{
            setname(user.name)
            setemail(user.email)
        }
        if(success){
           const time = setTimeout(() => {
             dispatch(userUpdateReset())
           }, 5000)
           return () => {
             clearTimeout(time)
           }
        }
        
    }
    
  }, [dispatch,getUserDetails,user,success,userInfo]);
  return (
    <Row>
      {success && (
        <Message variant='success'>Profile updated successfully.</Message>
      )}
      {message && <Message variant='danger'>{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col md={3}>
          <h1>Profile</h1>
          <Form onSubmit={updateProfileHandler}>
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                required
                onChange={(e) => setname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button type='submit'>Update Profile</Button>
          </Form>
        </Col>
      )}
      <Col md={9}>
        {orderLoading ? (
          <Loader></Loader>
        ) : orderError ? (
          <Message variant='danger'>{orderError}</Message>
        ) : (
          <Table bordered striped responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIEVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index) => {
                return (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0,10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelievered ? (
                        order.delieveredAt.substring(0,10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className='btn-sm' variant='light'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen