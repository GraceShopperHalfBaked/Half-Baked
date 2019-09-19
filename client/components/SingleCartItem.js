import React from 'react'

const SingleCartItem = props => {
  console.log(props)
  const {cartItem} = props
  const {removingCartItem} = props
  return (
    <div>
      <img src={cartItem.imageUrl} />
      <h3>{cartItem.name}</h3>
      <p>Quantity: {cartItem.productOrder.quantity}</p>
      <p>Price: {cartItem.productOrder.totalProductPrice}</p>
      <button type="submit" onClick={() => removingCartItem(cartItem.id)}>
        Remove Item
      </button>
    </div>
  )
}

export default SingleCartItem
