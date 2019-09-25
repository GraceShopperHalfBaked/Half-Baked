import React from 'react'

const OrderHistorySidebar = props => {
  // const {allCartItems, processCheckout, processGuestCheckout, userId} = props
  // let totalOrderPrice = 0

  // for (let i = 0; i < allCartItems.length; i++) {
  //   totalOrderPrice += allCartItems[i].productOrder
  //     ? (allCartItems[i].cartQuantity ||
  //         allCartItems[i].productOrder.quantity) * allCartItems[i].currentPrice
  //     : allCartItems[i].cartQuantity * allCartItems[i].currentPrice
  // }

  // const subTotal = (totalOrderPrice / 100).toFixed(2)
  // const tax = (totalOrderPrice * 0.08 / 100).toFixed(2)
  // const total = (Number(subTotal) + Number(tax)).toFixed(2)
  const {oneOrder} = props
  return (
    <div id="sidebar">
      <div id="shopping-summ">Order History</div>
      <div>
        <strong>
          <p>Order Date: {oneOrder.createdAt.slice(0, 10)} </p>
        </strong>
      </div>
      <div>
        <hr id="hr-cart" />
      </div>
      <p> Order Status: {oneOrder.cartStatus}</p>
      <p>Order Number: {oneOrder.id}</p>
      <div>
        <hr id="hr-cart" />
      </div>
      <div>
        <strong>
          Order Total: ${(oneOrder.totalOrderPrice / 100).toFixed(2)}
        </strong>
      </div>
    </div>
  )
}

export default OrderHistorySidebar
