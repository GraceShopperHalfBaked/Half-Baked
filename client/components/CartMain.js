import React from 'react'
// import 'fetch the orders thunk'
import {connect} from 'react-redux'
import cartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>Cart - Items: {'props.orders.length'}</div>
        'MAP OVER THE ORDERS ARRAY AND POPULATE img, name, count, price'
        <cartSummary />
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
    fetchAllCartItems: orderId => dispatch(fetchAllCartItems(orderId))
  }
}

const CartMain = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCartMain
)

export default CartMain
