import React, { Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import classes from './Loader.module.css'

const Loader = () => {
  return (
    <div className={`${classes.loader} d-flex justify-content-center align-items-center`}>
      <Spinner animation='grow' variant='primary' />
      <Spinner animation='grow' variant='secondary' />
      <Spinner animation='grow' variant='info' />
    </div>
  )
}

export default Loader