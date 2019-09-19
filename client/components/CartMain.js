import React from 'react'
import {connect} from 'react-redux'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  render() {
    const {allCartItems} = this.props

    return (
      <div>
        {allCartItems.map(cartItem => {
          return (
            <div key={cartItem.id}>
              <SingleCartItem cartItem={cartItem} />
            </div>
          )
        })}
        <CartSummary allCartItems={allCartItems} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allCartItems: state.order.cart
  }
}

const CartMain = connect(mapStateToProps)(DisconnectedCartMain)

export default CartMain
