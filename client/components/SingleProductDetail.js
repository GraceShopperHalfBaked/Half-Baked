import React from 'react'
import {fetchSelectedProduct} from '../store/product'
import {connect} from 'react-redux'

class DisconnectedSingleProductDetail extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    console.log('prodid', productId)
    this.props.fetchSelectedProduct(productId)
  }

  render() {
    const {selectedProduct} = this.props
    return (
      <div>
        {selectedProduct.name}
        Price: {selectedProduct.price}
        <img src={selectedProduct.imageUrl} />
        Description: {selectedProduct.description}
        Quantity Add to Cart!
        {/* <button onClick={() => {} className='remove'>X</button> */}
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
