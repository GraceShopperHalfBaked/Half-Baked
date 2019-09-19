import React from 'react'

const SingleCartItem = props => {
  return (
    <div>
      <img src={props.cartItem.imageUrl} />
      <h3>{props.cartItem.name}</h3>
      <p>Quantity: {props.cartItem.productOrder.quantity}</p>
      <p>Price: {props.cartItem.productOrder.totalProductPrice}</p>
    </div>
  )
}

export default SingleCartItem
