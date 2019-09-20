import React from 'react'
// import 'fetch cart order stuff here'

const CartSummary = props => {
  const {allCartItems} = props
  let totalOrderPrice = 0
  console.log('before enter loop totalorderprice: ', totalOrderPrice)

  for (let i = 0; i < allCartItems.length; i++) {
    console.log('here before addding')
    console.log('here before addding allCartItems', allCartItems[i])

    totalOrderPrice += allCartItems[i].productOrder
      ? allCartItems[i].productOrder.quantity * allCartItems[i].currentPrice
      : allCartItems[i].cartQuantity * allCartItems[i].currentPrice
    console.log('here after addding totalorderprice: ', totalOrderPrice)
  }
  const totalOrderTax = (totalOrderPrice * 0.08).toFixed(2)
  const totalOrderPriceWithTax = Number(totalOrderPrice) + Number(totalOrderTax)

  return (
    <div id="sidebar">
      <div>
        <p>
          <strong>Subtotal:</strong> ${totalOrderPrice}
        </p>
      </div>

      <div>
        <hr id="hr-cart" />
      </div>
      <div />
      <p>Estimated Shipping: FREE</p>
      <p>Estimated Tax: ${totalOrderTax}</p>

      <div>
        <hr id="hr-cart" />
      </div>
      <p>
        <strong>Estimated Total: ${totalOrderPriceWithTax}</strong>
      </p>
      <p>
        <button type="button" onClick={() => props.processCheckout()}>
          CHECKOUT HERE!
        </button>
        {/* <button>STRIPE CHECKOUT HERE!</button> */}
      </p>
    </div>
  )
}

export default CartSummary
