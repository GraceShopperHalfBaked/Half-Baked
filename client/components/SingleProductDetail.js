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
      <div id="single-detail">
        <div>
          <img src={selectedProduct.imageUrl} id="single-img-details" />
        </div>
        <div id="single-prod-info">
          <h3>{selectedProduct.name}</h3>
          <p>Price: {selectedProduct.currentPrice}</p>
          {selectedProduct.description}
          <p>
            <select id="quantity-select">
              {' '}
              {/*onChange={this.handleChange}*/}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <button>Add to Cart!</button>
          </p>
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
