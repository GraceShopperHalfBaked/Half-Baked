import React from 'react'
import {connect} from 'react-redux'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    // const orderId = this.props.match.params.orderId
    // this.props.fetchCart(orderId)
  }

  render() {
    const {allCartItems} = this.props
    console.log(allCartItems)
    return (
      <div>
        {allCartItems.map(cartItem => {
          return (
            <div key={cartItem.id}>
              <SingleCartItem cartItem={cartItem} />
            </div>
          )
        })}
        <CartSummary /> //need to pass some cart order info as props
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allCartItems: state.order.cart
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchCart: orderId => dispatch(fetchCart(orderId))
//   }
// }

const CartMain = connect(mapStateToProps)(DisconnectedCartMain)

export default CartMain
