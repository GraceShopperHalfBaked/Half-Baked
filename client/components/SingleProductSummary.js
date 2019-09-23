import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {addToCart, updateCartQuantity} from '../store/order'
import AddToCart from './AddToCart'

class DisconnectedSingleProductSummary extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/products/${this.props.product.id}`}>
          <img src={this.props.product.imageUrl} className="prod-img" />
          <p id="bold-this-name">{this.props.product.name}</p>
        </Link>
        <div>Price: ${(this.props.product.currentPrice / 100).toFixed(2)}</div>
        <AddToCart product={this.props.product} />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product)),
    updateCartQuantity: product => dispatch(updateCartQuantity(product))
  }
}

const SingleProductSummary = connect(null, mapDispatch)(
  DisconnectedSingleProductSummary
)

export default SingleProductSummary
