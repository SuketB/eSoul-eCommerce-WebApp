import React from 'react'
import {Helmet} from "react-helmet";
const MetaHelmet = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keyword' content={keywords}></meta>
    </Helmet>
  )

  MetaHelmet.defaultProps = {
    title: 'Welcome To ESoul',
    description: 'We sell the best quality products for fair prices.',
    keywords: 'quality, electronics, buy electronics, ecommerce'
  }
}

export default MetaHelmet