import React from 'react'
import {Link} from 'react-router-dom'

const singleProductSummary = props => {
  return (
    <div>
      <Link to={`/products/${props.product.id}`}>{props.product.name}</Link>
      <img src={props.product.imageUrl} />
      Price: {props.product.price}
      Quantity Add to Cart!
      {/* <button onClick={() => {} className='remove'>X</button> */}
    </div>
  )
}

export default singleProductSummary
