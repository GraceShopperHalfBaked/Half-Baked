import React from 'react'

const singleCartItem = props => {
  return (
    <div>
      <img src={props.cartItem.imageUrl} />
      <h3>{props.cartItem.name}</h3>
      Quantity: {props.cartItem.quantity}
      Price: {props.cartItem.totalProductPrice}
    </div>
  )
}

export default singleCartItem
