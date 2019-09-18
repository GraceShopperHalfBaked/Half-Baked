import React from 'react'
// import 'fetch the orders thunk'
import {connect} from 'react-redux'
import CartSummary from './CartSummary'

class DisconnectedCartMain extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div id="cart-main">
        <div>
          Cart - Items: {'props.orders.length'}
          'MAP OVER THE ORDERS ARRAY AND POPULATE img, name, count, price' "Sed
          ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
          fugiat quo voluptas nulla pariatur?"
        </div>

        <CartSummary />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    // allCartItems: state.cart.all
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
