import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleProductSummary from './SingleProductSummary'
import {fetchProducts} from '../store/product'
import {fetchCart} from '../store/order'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.fetchCart(this.props.user.id)
  }

  render() {
    const {products} = this.props
    return (
      <div id="home">
        {products.map(product => (
          <div key={product.id}>
            <SingleProductSummary
              product={product}
              userId={this.props.user.id}
              cart={this.props.cart}
            />
          </div>
        ))}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    cart: state.order.cart,
    products: state.product.all
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
