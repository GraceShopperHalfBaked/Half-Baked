import React from 'react'
import AddToCart from './AddToCart'

const SingleCartItem = props => {
  const {cartItem, removingCartItem} = props
  const singlePrice = (cartItem.currentPrice / 100).toFixed(2)
  const quantity = cartItem.cartQuantity

  //finalQuant is the Quantity selected on line 22
  const finalQuant = cartItem.productOrder
    ? quantity || cartItem.productOrder.quantity
    : quantity

  return (
    <div id="sing-cart-item">
      <div>
        <img src={cartItem.imageUrl} className="prod-img-cart" />
      </div>

      <div>
        <h3 id="bold-this-name">{cartItem.name}</h3>
        <p className="cart-deets">Quantity: {finalQuant}</p>
        <p className="cart-deets">Price: ${singlePrice}</p>
        {/* Total Price: ${cartItem.productOrder
          ? (singlePrice * cartItem.productOrder.quantity).toFixed(2)
          : (singlePrice * quantity).toFixed(2)} */}
        Total Price: ${cartItem.productOrder
          ? singlePrice * finalQuant
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
