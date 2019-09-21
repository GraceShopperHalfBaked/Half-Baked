import React from 'react'
import AddToCart from './AddToCart'

const SingleCartItem = props => {
  const {cartItem} = props
  const {removingCartItem} = props

  console.log('CART QTY: ', cartItem.productOrder)
  console.log('CART qty: ', cartItem.cartQuantity)

  if (cartItem.cartQuantity > 0) {
    cartItem.productOrder.quantity =
      cartItem.cartQuantity + cartItem.product.quanity
  }

  return (
    <div id="sing-cart-item">
      <div>
        <img src={cartItem.imageUrl} className="prod-img-cart" />
      </div>

      <div>
        <h3>{cartItem.name}</h3>
        <p className="cart-deets">
          Quantity: {cartItem.productOrder.quantity}
          {/* {cartItem.productOrder
            ? cartItem.productOrder.quantity
            : cartItem.cartQuantity} */}
        </p>
        <p className="cart-deets">Price: {cartItem.currentPrice}</p>
        <p>
          Total Price:{' '}
          {cartItem.productOrder
            ? cartItem.currentPrice * cartItem.productOrder.quantity
            : cartItem.currentPrice * cartItem * cartItem.cartQuantity}
        </p>

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
