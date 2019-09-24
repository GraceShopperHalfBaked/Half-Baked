import React from 'react'
import {Link} from 'react-router-dom'
// import 'fetch cart order stuff here'

const CartSummary = props => {
  const {allCartItems, processCheckout} = props
  let totalOrderPrice = 0
  // console.log('before enter loop totalorderprice: ', totalOrderPrice)

  for (let i = 0; i < allCartItems.length; i++) {
    // console.log('here before addding')
    console.log('here before addding allCartItems', allCartItems[i])

    totalOrderPrice += allCartItems[i].productOrder
      ? allCartItems[i].productOrder.quantity * allCartItems[i].currentPrice
      : allCartItems[i].cartQuantity * allCartItems[i].currentPrice
    // console.log('here after addding totalorderprice: ', totalOrderPrice)
  }
  const subTotal = (totalOrderPrice / 100).toFixed(2)
  const tax = (totalOrderPrice * 0.08 / 100).toFixed(2)
  const total = (Number(subTotal) + Number(tax)).toFixed(2)
  // console.log(allCartItems)
  return (
    <div id="sidebar">
      <div id="shopping-summ">Summary</div>
      <div>
        <p>
          <strong>Subtotal:</strong> ${subTotal}
        </p>
      </div>
      <div>
        <hr id="hr-cart" />
      </div>
      <p>Estimated Shipping: FREE</p>
      <p>Estimated Tax: ${tax}</p>
      <hr id="hr-cart" />
      <p>
        <strong>Estimated Total: ${total}</strong>
      </p>

      <Link to="/checkout">
        <button
          type="button"
          onClick={() =>
            processCheckout(
              allCartItems[0].productOrder
                ? allCartItems[0].productOrder.orderId
                : allCartItems[0].orderId
            )
          }
        >
          CHECKOUT HERE!
        </button>
        {/* <button>STRIPE CHECKOUT HERE!</button> */}
      </Link>
    </div>
  )
}

export default CartSummary
