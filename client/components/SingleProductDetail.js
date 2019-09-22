import React from 'react'
import {fetchSelectedProduct} from '../store/product'
import {connect} from 'react-redux'
import AddToCart from './AddToCart'
import {fetchCart} from '../store/order'

class DisconnectedSingleProductDetail extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSelectedProduct(productId)
    this.props.fetchCart(this.props.user.id)
  }

  render() {
    const {selectedProduct} = this.props
    return (
      <div id="single-detail">
        <div>
          <img src={selectedProduct.imageUrl} id="single-img-details" />
        </div>
        <div id="single-prod-info">
          <h3>{selectedProduct.name}</h3>
          <p>Price: ${(selectedProduct.currentPrice / 100).toFixed(2)}</p>
          {selectedProduct.description}
          <AddToCart product={selectedProduct} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    selectedProduct: state.product.selected
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedProduct: productId =>
      dispatch(fetchSelectedProduct(productId)),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

const SingleProductDetail = connect(mapState, mapDispatch)(
  DisconnectedSingleProductDetail
)

export default SingleProductDetail
