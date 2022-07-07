import React,{Fragment, useEffect} from 'react'
import { Button, NavLink, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteUser, getAllUsers, resetUserDelete } from '../redux/store';

const UsersListScreen = () => {
    
  const dispatch = useDispatch()
  const history = useHistory()

  const {users,loading,error} = useSelector((state) => state.user.userList)

  const {success:deleteSuccess} = useSelector((state) => state.user.userDelete)

  const {userInfo} = useSelector(state => state.user.userLogin)
  
  const deleteUserHandler = (id) => {
     dispatch(deleteUser(id))
  }

  useEffect(() => {
    
    if(userInfo && userInfo.isAdmin){
     dispatch(getAllUsers())
    }
    else{
      history.push('/')
    }
    if(deleteSuccess){
      dispatch(resetUserDelete())
    }
    
  }, [dispatch,userInfo,deleteSuccess]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <h2 className='text-center'>Users</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    Email: <a href={`mailto:${user.email}`}> {user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-trash' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button
                        variant='light'
                        className='btn-sm'
                        
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
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

export default UsersListScreen