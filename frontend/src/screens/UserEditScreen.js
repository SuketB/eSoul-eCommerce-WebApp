import { Link, useParams } from 'react-router-dom'
import { getUserDetails, resetUserUpdateByAdminDelete, updateUserByID } from '../redux/store'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'


const UserEditScreen = () => {
 const [name, setname] = useState('')
 const [email, setemail] = useState('')
 const [isAdmin,setIsAdmin] = useState(false)
 const dispatch = useDispatch()
 const history = useHistory()
 const params = useParams()
 const {id:userId} = params

 const user = useSelector((state) => state.user)
 const {  userInfo } = user.userLogin

 const {loading,error, userInfo:userDetails} = useSelector(state => state.user.userDetails)
 
 const {loading: loadingUpdate, error: errorUpdate, success: loadingSuccess} = useSelector(state => state.user.userUpdateByAdmin)

 const updateHandler = (e) => {
   e.preventDefault()
   //update user
   dispatch(updateUserByID({
     _id: userId,
     name,
     email,
     isAdmin
   }))
 }

 useEffect(() => {
   if (userInfo && userInfo.isAdmin) {
     //get user details
     if(loadingSuccess){
        dispatch(resetUserUpdateByAdminDelete())
        history.push('/admin/users')
     }
     if(!userDetails || userDetails._id != userId){
        dispatch(getUserDetails(userId))
     }
     else{
        setname(userDetails.name)
        setemail(userDetails.email)
        setIsAdmin(userDetails.isAdmin)
     }
   }
   else{
     history.redirect('/')
   }
 }, [history, userInfo,userDetails])
 return (
   <Fragment>
     <Link to='/admin/users' className='btn btn-light my-3'>
       <i class='fa fa-arrow-left' aria-hidden='true'></i> Go Back
     </Link>
     {loading ? (
       <Loader />
     ) : error ? (
       <Message variant='danger'>{error}</Message>
     ) : (
       <FormContainer>
         <h1>Edit User</h1>
         {loadingUpdate ? (
           <Loader></Loader>
         ) : errorUpdate ? (
           <Message variant='danger'>{error}</Message>
         ) : (
           <Form onSubmit={updateHandler}>
             <FormGroup>
               <Form.Label>Name</Form.Label>
               <Form.Control
                 type='text'
                 placeholder='Full Name'
                 value={name}
                 onChange={(e) => setname(e.target.value)}
               />
             </FormGroup>
             <FormGroup>
               <Form.Label>Email</Form.Label>
               <Form.Control
                 type='email'
                 value={email}
                 placeholder='example@gmail.com'
                 onChange={(e) => setemail(e.target.value)}
               />
             </FormGroup>
             <FormGroup controlId='isadmin'>
               <Form.Check
                 type='checkbox'
                 label='is Admin?'
                 checked={isAdmin}
                 onChange={(e) => setIsAdmin(e.target.checked)}
               />
             </FormGroup>
             <div className='d-grid gap-2'>
               <Button type='submit' variant='dark'>
                 Update User
               </Button>
             </div>
           </Form>
         )}
       </FormContainer>
     )}
   </Fragment>
 )
}

export default UserEditScreen