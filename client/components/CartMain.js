import React from 'react'
import {connect} from 'react-redux'

import {fetchCart} from '../store/order'
import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchCart(orderId)
  }

  render() {
    const allCartItems = this.props.allCartItems

    return (
      <div>
        {allCartItems.map(cartItem => {
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
    allCartItems: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: orderId => dispatch(fetchCart(orderId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
