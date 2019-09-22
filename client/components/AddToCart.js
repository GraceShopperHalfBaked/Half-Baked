import React from 'react'
import {addToCart, updateCartQuantity} from '../store/order'
import {connect} from 'react-redux'

class DisconnectedAddToCart extends React.Component {
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
    let orderId = null
    if (this.props.user.id && this.props.cart[0]) {
      orderId = this.props.cart[0].productOrder.orderId
    }
    const productToAdd = {
      ...this.props.product,
      userId: this.props.user.id,
      orderId,
      cartQuantity: this.state.cartQuantity
    }

    if (this.props.cart.length > 0 && this.props.user.id) {
      //----------------revisit------------------------------
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
    updateCartQuantity: product => dispatch(updateCartQuantity(product))
    // fetchCart: userId => dispatch(fetchCart(userId))
  }
}

const AddToCart = connect(mapState, mapDispatch)(DisconnectedAddToCart)

export default AddToCart
