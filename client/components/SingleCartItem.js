import React from 'react'

const SingleCartItem = props => {
  const {cartItem} = props
  const {removingCartItem} = props
  return (
    <div>
      <img src={cartItem.imageUrl} />
      <h3>{cartItem.name}</h3>
      <p>
        Quantity:{' '}
        {cartItem.productOrder
          ? cartItem.productOrder.quantity
          : cartItem.cartQuantity}
      </p>
      <p>Price: {cartItem.currentPrice}</p>
      Total Price:{' '}
      {cartItem.productOrder
        ? cartItem.currentPrice * cartItem.productOrder.quantity
        : cartItem.currentPrice * cartItem * cartItem.cartQuantity}
      <button type="submit" onClick={() => removingCartItem(cartItem.id)}>
        Remove Item
      </button>
      <h1>fds</h1>
    </div>
  )
}

export default SingleCartItem
