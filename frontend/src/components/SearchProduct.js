import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const SearchProduct = () => {

    const [keyword, setkeyword] = useState('');
    const history = useHistory()

    const searchHandler = (e) => {
     e.preventDefault()
     if(keyword){
history.push(`/search/${keyword}`)
     }
     else {
        history.push('/')
     }
     
    }
  return (
    <Form onSubmit={searchHandler} inline className='d-flex  my-2 my-md-0'>
      <Form.Control
      
        type='text'
        name='q'
        onChange={(e) => setkeyword(e.target.value)}
        placeholder='Search Products...'
        className='me-sm-2'
      ></Form.Control>
      <Button type='submit' variant='outline-dark' className='p-2 '>
        Search
      </Button>
    </Form>
  )
}

export default SearchProduct