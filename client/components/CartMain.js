import React from 'react'
import {connect} from 'react-redux'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'
import {removingCartItem} from '../store/order'

class DisconnectedCartMain extends React.Component {
  render() {
    console.log(this.props)
    const {allCartItems} = this.props
    // const {removingCartItem} = this.props
    return (
      <div>
        {allCartItems.map(cartItem => {
          return (
            <div key={cartItem.id}>
              <SingleCartItem
                cartItem={cartItem}
                removingCartItem={this.props.removingCartItem}
              />
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

const mapDispatchToProps = dispatch => {
  return {
    removingCartItem: productId => dispatch(removingCartItem(productId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
