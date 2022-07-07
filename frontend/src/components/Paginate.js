import React, { Fragment } from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({page,keyword='',isAdmin=false,pages}) => {
  return <Fragment>
    {pages > 1 && 
    <Pagination className='justify-content-center'>
        { [...Array(pages).keys()].map(x => (
            <LinkContainer key={x} to={
                !isAdmin ? 
                (!keyword ? 
                `/page/${x+1}` : 
                `/search/${keyword}/page/${x+1}`) :
                (`/admin/products/page/${x+1}`)
            }>
             <Pagination.Item active={x+1===page}>
                {x+1}
             </Pagination.Item>
            </LinkContainer>
        ))}
    </Pagination>
    }
    </Fragment>
}

export default Paginate