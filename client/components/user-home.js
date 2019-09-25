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
    if (this.props.user) {
      this.props.fetchCart(this.props.user.id)
    }
  }

  render() {
    const email = this.props.user.email
    const {products} = this.props
    console.log('EMAIL: ', this.props.user.email)
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
