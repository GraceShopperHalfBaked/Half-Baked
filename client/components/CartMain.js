import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'
import {removingCartItem, fetchCart} from '../store/order'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.fetchCart(this.props.user.id)
  }
  render() {
    console.log('🤗🤗🤗🤗🤗🤗', this.props)
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
    allCartItems: state.order.cart,
    user: state.user,
    products: state.product.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    fetchCart: userId => dispatch(fetchCart(userId)),
    removingCartItem: productId => dispatch(removingCartItem(productId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
