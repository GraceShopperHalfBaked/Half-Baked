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
    getProducts: () => dispatch(fetchProducts)
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
