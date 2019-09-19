import React from 'react'
// import 'fetch cart order stuff here'

const CartSummary = props => {
  const {allCartItems} = props
  let totalOrderPrice = 0
  for (let i = 0; i < allCartItems.length; i++) {
    totalOrderPrice += allCartItems[i].productOrder.totalProductPrice
  }
  const totalOrderTax = (totalOrderPrice * 0.08).toFixed(2)
  const totalOrderPriceWithTax = Number(totalOrderPrice) + Number(totalOrderTax)

  return (
    <div>
      <hr size="6" width="50%" align="left" color="green" />
      <p>
        <strong>Subtotal:</strong> ${totalOrderPrice}
      </p>
      <p>Estimated Shipping: FREE</p>
      <p>Estimated Tax: ${totalOrderTax}</p>
      <p>
        <strong>Estimated Total: ${totalOrderPriceWithTax}</strong>
      </p>

      <button>CHECKOUT HERE!</button>
      {/* <button>STRIPE CHECKOUT HERE!</button> */}
    </div>
  )
}

export default CartSummary
