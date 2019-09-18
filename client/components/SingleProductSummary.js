import React from 'react'
import {Link} from 'react-router-dom'
import {addToCart, updateCartQuantity} from '../store/order'
import {connect} from 'react-redux'

class DisconnectedSingleProductSummary extends React.Component {
  constructor() {
    super()
    this.state = {
      cartQuantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      cartQuantity: evt.target.value
    })
  }

  handleSubmit() {
    let productToAdd = {
      ...this.props.product,
      userId: this.props.userId,
      orderId: this.props.cart[0]
        ? this.props.cart[0].orderId || this.props.cart[0].productOrder.orderId
        : null,
      cartQuantity: this.state.cartQuantity
    }

    if (this.props.cart.length > 0) {
      for (let index = 0; index < this.props.cart.length; index++) {
        if (this.props.cart[index].id === this.props.product.id) {
          return this.props.updateCartQuantity(productToAdd)
        }
      }
      return this.props.addToCart(productToAdd)
    } else {
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
        <div>Price: {this.props.product.currentPrice}</div>

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

// const mapState = state => {
//   return {
//     // user: state.user,
//     // cart: state.order.cart
//   }
// }

const mapDispatch = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product)),
    updateCartQuantity: product => dispatch(updateCartQuantity(product))
    // fetchCart: userId => dispatch(fetchCart(userId))
  }
}

const SingleProductSummary = connect(null, mapDispatch)(
  DisconnectedSingleProductSummary
)

export default SingleProductSummary
