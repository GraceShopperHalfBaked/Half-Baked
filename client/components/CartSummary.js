import React from 'react'
// import 'fetch cart order stuff here'

const CartSummary = props => {
  return (
    <div>
      {/* Subtotal: {props.'ORDERS totalOrderPrice'}
            Tax: {props.'ORDERS totalOrderPrice * .08%'}
            Total: {props.'ORDERS totalOrderPrice * 1.08%'} */}

      <button>CHECKOUT HERE!</button>
      <button>STRIPE CHECKOUT HERE!</button>
    </div>
  )
}

export default CartSummary
