import React from 'react'
// import 'fetch cart order stuff here'
import {connect} from 'react-redux'

const CartSummary = props => {
  return (
    <div id="cart-side">
      {/* Subtotal: {props.'ORDERS totalOrderPrice'}
            Tax: {props.'ORDERS totalOrderPrice * .08%'}
            Total: {props.'ORDERS totalOrderPrice * 1.08%'} */}
      <h1>SUMMARY of YOUR CART!</h1>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
      illo inventore veritatis et quasi architecto beatae vitae dicta sunt
      explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
      quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
      eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
      corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
      Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
      nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
      nulla pariatur?"
      <p>
        <button>CHECKOUT HERE!</button>
      </p>
      <button>STRIPE CHECKOUT HERE!</button>
    </div>
  )
}

export default CartSummary
