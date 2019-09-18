import React from 'react'
import {fetchSelectedProduct} from '../store/product'
import {connect} from 'react-redux'

class DisconnectedSingleProductDetail extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    console.log('prodid', productId)
    this.props.fetchSelectedProduct(productId)
  }

  // addToCart() {

  // }

  render() {
    const {selectedProduct} = this.props
    return (
      <div id="single-detail">
        <div>
          <img src={selectedProduct.imageUrl} id="single-img-details" />
        </div>
        <div id="single-prod-info">
          <h3>{selectedProduct.name}</h3>
          <p>Price: {selectedProduct.currentPrice}</p>
          {selectedProduct.description}
          <p>Quantity: {selectedProduct.quantity}</p>
          <button>Add to Cart!</button>
          {/* <button onClick={() => {} className='remove'>Add to Cart!</button> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedProduct: state.product.selected
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedProduct: productId => dispatch(fetchSelectedProduct(productId))
  }
}

const SingleProductDetail = connect(mapState, mapDispatch)(
  DisconnectedSingleProductDetail
)

export default SingleProductDetail
