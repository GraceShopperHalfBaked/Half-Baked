import React from 'react'
import {Link} from 'react-router-dom'
import StrCheckout from './StripeCheckout'

// import 'fetch cart order stuff here'

const CartSummary = props => {
  const {allCartItems, processCheckout, processGuestCheckout, userId} = props
  let totalOrderPrice = 0

  for (let i = 0; i < allCartItems.length; i++) {
    totalOrderPrice += allCartItems[i].productOrder
      ? (allCartItems[i].cartQuantity ||
          allCartItems[i].productOrder.quantity) * allCartItems[i].currentPrice
      : allCartItems[i].cartQuantity * allCartItems[i].currentPrice
  }

  const subTotal = (totalOrderPrice / 100).toFixed(2)
  const tax = (totalOrderPrice * 0.08 / 100).toFixed(2)
  const total = (Number(subTotal) + Number(tax)).toFixed(2)
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
      <div>
        <hr id="hr-cart" />
      </div>
      <div>
        <strong>Estimated Total: ${total}</strong>
      </div>
      {/*check to see if it is a guest or an existing user. If the userId is null(it means its a guest), run the first part of the ternary; otherwise, its a user, run the second part.*/}
      {!userId ? (
        <div>
          <button type="button" onClick={() => processGuestCheckout()}>
            CHECKOUT HERE!
          </button>
          <div>
            <StrCheckout
              name="Half-Baked"
              description="Purchase of Half-Baked Goods"
              amount={total}
              orderId={
                allCartItems[0].productOrder
                  ? allCartItems[0].productOrder.orderId
                  : allCartItems[0].orderId
              }
            />
          </div>
        </div>
      ) : (
        <div>
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
          <div>
            <StrCheckout
              name="Half-Baked"
              description="Purchase of Half-Baked Goods"
              amount={total}
              orderId={
                allCartItems[0].productOrder
                  ? allCartItems[0].productOrder.orderId
                  : allCartItems[0].orderId
              }
            />
          </div>

          {/* <button>STRIPE CHECKOUT HERE!</button> */}
        </div>
      )}
    </div>
  )
}

export default CartSummary
