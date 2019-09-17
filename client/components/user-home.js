import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleProductSummary from './SingleProductSummary'
import {fetchProducts} from '../store/product'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  /*
    - dispatches orders thunk, which checks if any orders match userId with a pending status (findorcreate)
    - if pendingOrder doesn't exist,
      - create order with that UserId and Pending status
      - create ProductOrder with productID, orderId, quantity, and price
    - if pendingOrder does exist
      - search productorder for that orderId, and given productId
        - if productId doesnt exist, create new productorder with productID, orderId, quantity, and price
        - if productId does exist, update product order with new quantity and price
    */

  render() {
    const {products} = this.props
    return products.map(product => {
      return (
        <div key={product.id}>
          <SingleProductSummary product={product} />
        </div>
      )
    })
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.product.all
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
