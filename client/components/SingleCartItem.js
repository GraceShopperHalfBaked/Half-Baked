import React from 'react'

const SingleCartItem = props => {
  const {cartItem} = props
  const {removingCartItem} = props
  return (
    <div id="sing-cart-item">
      <div>
        <img src={cartItem.imageUrl} className="prod-img" />
      </div>

      <div>
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
        <p>
          <button
            type="submit"
            onClick={() =>
              removingCartItem(cartItem.productOrder.orderId, cartItem.id)
            }
          >
            Remove Item
          </button>
        </p>
      </div>
    </div>
  )
}

export default SingleCartItem
