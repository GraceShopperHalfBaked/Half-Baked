import React from 'react'

const SingleCartItem = props => {
  const {cartItem} = props
  const {removingCartItem} = props
  return (
    <div>
      <img src={cartItem.imageUrl} className="prod-img" />
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
    </div>
  )
}

export default SingleCartItem
