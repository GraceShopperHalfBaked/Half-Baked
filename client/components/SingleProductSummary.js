import React from 'react'
import {Link} from 'react-router-dom'
import {addToCart, updateCartQuantity, fetchCart} from '../store/order'
import {connect} from 'react-redux'
import {STATUS_CODES} from 'http'

class DisconnectedSingleProductSummary extends React.Component {
  constructor() {
    super()
    this.state = {
      cartQuantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }

  handleChange(evt) {
    // console.log('EVT', evt.target.value)
    this.setState({
      cartQuantity: evt.target.value
    })
  }

  handleSubmit() {
    let productToAdd = {
      ...this.props.product,
      userId: this.props.user.id,
      orderId: this.props.cart.orderId,
      cartQuantity: this.state.cartQuantity
    }

    if (this.props.cart.products.length > 0) {
      console.log('entered1')
      for (let index = 0; index < this.props.cart.products.length; index++) {
        if (this.props.cart.products[index].id === this.props.product.id) {
          return this.props.updateCartQuantity(productToAdd)
        }
      }
      console.log('entered2')
      return this.props.addToCart(productToAdd)
    } else {
      console.log('entered3')
      return this.props.addToCart(productToAdd)
    }
  }

  render() {
    return (
      <div>
        <Link to={`/products/${this.props.product.id}`}>
          <img src={this.props.product.imageUrl} className="prod-img" />
          <p>{this.props.product.name}</p>
        </Link>
        Price: {this.props.product.currentPrice}
        <label htmlFor="quantity-select">
          Quantity: {this.props.product.quantity}
        </label>
        <select id="quantity-select" onChange={this.handleChange}>
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
        <button type="button" onClick={this.handleSubmit}>
          Add to Cart!
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.order.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product)),
    updateCartQuantity: product => dispatch(updateCartQuantity(product)),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

const SingleProductSummary = connect(mapState, mapDispatch)(
  DisconnectedSingleProductSummary
)

export default SingleProductSummary
