import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

import SingleCartItem from './SingleCartItem'
import CartSummary from './CartSummary'
import {
  removingCartItem,
  fetchCart,
  processCheckout,
  processGuestCheckout
} from '../store/order'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.fetchCart(this.props.user.id)
  }
  render() {
    const {allCartItems} = this.props
    return (
      <div>
        {allCartItems.length > 0 ? (
          <div>
            <div id="shopping">Shopping Cart</div>
            <div className="cart-main">
              <div>
                {allCartItems.map(cartItem => {
                  return (
                    <div key={cartItem.id}>
                      <SingleCartItem
                        cartItem={cartItem}
                        removingCartItem={this.props.removingCartItem}
                      />
                      <hr id="hr-cart" />
                    </div>
                  )
                })}
              </div>

              <div>
                <CartSummary
                  allCartItems={allCartItems}
                  processCheckout={this.props.processCheckout}
                  processGuestCheckout={this.props.processGuestCheckout}
                  userId={this.props.user.id}
                />
              </div>
            </div>
          </div>
        ) : (
          <div id="form-div">
            <div id="sides" />
            <div id="middle-form">
              <div id="middle-bit-r">
                <div id="auth-greet-1">
                  <h1>Your cart is empty!</h1>
                </div>

                <div>
                  <h1 id="auth-greet-1" />
                  <p id="auth-greet-2">fill your basket!</p>

                  <img
                    src="https://cdn1.imggmi.com/uploads/2019/9/25/880f954245d6dfa71809d0964d6c143a-full.png"
                    id="login-cake"
                  />
                </div>
              </div>
            </div>
            <div id="sides" />
          </div>
        )}
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
    processCheckout: orderId => dispatch(processCheckout(orderId)),
    processGuestCheckout: () => dispatch(processGuestCheckout()),
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
