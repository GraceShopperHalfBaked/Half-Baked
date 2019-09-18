import React from 'react'
import {connect} from 'react-redux'

import {fetchSingleCart} from '../store/order'
import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchSingleCart(orderId)
  }

  render() {
    const cartItems = this.props.cartItems

    return (
      <div>
        {cartItems.map(cartItem => {
          return (
            <div key={cartItem.id}>
              <SingleCartItem cartItem={cartItem} />
            </div>
          )
        })}
        <CartSummary />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allCartItems: state.cart.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleCart: orderId => dispatch(fetchSingleCart(orderId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
