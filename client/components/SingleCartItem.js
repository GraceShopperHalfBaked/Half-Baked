import React from 'react'
import AddToCart from './AddToCart'

const SingleCartItem = props => {
  const {cartItem, removingCartItem} = props
  const singlePrice = (cartItem.currentPrice / 100).toFixed(2)
  const quantity = cartItem.cartQuantity
  // console.log(cartItem)
  return (
    <div id="sing-cart-item">
      <div>
        <img src={cartItem.imageUrl} className="prod-img" />
      </div>

      <div>
        <h3>{cartItem.name}</h3>
        <p>
          Quantity:{' '}
          {cartItem.productOrder ? cartItem.productOrder.quantity : quantity}
        </p>
        <p>Price: ${singlePrice}</p>
        Total Price: ${cartItem.productOrder
          ? (singlePrice * cartItem.productOrder.quantity).toFixed(2)
          : (singlePrice * quantity).toFixed(2)}
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
        <AddToCart product={cartItem} />
      </div>
    </div>
  )
}

export default SingleCartItem
