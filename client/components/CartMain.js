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
    // console.log('this is allcartitems', allCartItems)
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
          <div>Your cart is empty!</div>
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
