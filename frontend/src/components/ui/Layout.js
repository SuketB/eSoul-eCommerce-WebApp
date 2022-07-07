import React, { Fragment } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { Container } from 'react-bootstrap'

const Layout = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <Container className='py-2'>{props.children}</Container>
      <Footer></Footer>
    </Fragment>
  )
}

export default Layout
