import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/store'
import {LinkContainer} from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import SearchProduct from './SearchProduct'
const Header = () => {
  const userInfo = useSelector((state)=>state.user.userLogin.userInfo)
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <Navbar bg='light' variant='light' expand='lg' className='mb-3'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <img
              alt=''
              src='/images/ghost.png'
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            eSoul
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <SearchProduct></SearchProduct>
          <Nav className='ms-auto '>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fa-solid fa-cart-shopping'></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown className='me-0' title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(userLogout())
                    history.push('/')
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fa-solid fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin ? (
              <NavDropdown title='Admin' id='admin'>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orders'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
