import React from 'react'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/order'
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

const mapDispatch = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product))
  }
}

export default singleProductSummary
