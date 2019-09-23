import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'
import {removingCartItem, fetchCart, processCheckout} from '../store/order'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.fetchCart(this.props.user.id)
  }
  render() {
    const {allCartItems, removingCartItem, processCheckout} = this.props

    return (
      <div>
        <div id="shopping">Shopping Cart</div>
        <div className="cart-main">
          <div>
            {allCartItems.map(cartItem => {
              return (
                <div key={cartItem.id}>
                  <SingleCartItem
                    cartItem={cartItem}
                    removingCartItem={removingCartItem}
                  />
                  <hr id="hr-cart" />
                </div>
              )
            })}
          </div>

          <div>
            <CartSummary
              allCartItems={allCartItems}
              processCheckout={processCheckout}
            />
          </div>
        </div>
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
    processCheckout: cart => dispatch(processCheckout(cart)),
    getProducts: () => dispatch(fetchProducts()),
    fetchCart: userId => dispatch(fetchCart(userId)),
    removingCartItem: (orderId, productId) =>
      dispatch(removingCartItem(orderId, productId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
