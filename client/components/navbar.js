import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {logout, clearCart} from '../store'
import {withRouter} from 'react-router'

import Home from './user-home'
import CartMain from './CartMain'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div id="inner-links">
            <Link to="/home" className="navLink">
              Home
            </Link>
          </div>
          <Link to="/about">About</Link>
          <Link to="/home">
            <img
              src="https://i.ibb.co/B6TFYcv/temp-Half-Baked-LOGO.png"
              height={100}
              className="navLogo-in"
            />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart" id="cart-icon-cont">
            <img
              src="https://images.all-free-download.com/images/graphiclarge/shopping_cart_icon_vector_red_background_280670.jpg"
              id="checkout-icon"
            />

            <div id="cart-qty">
              {cart.length
                ? cart.reduce((accumulator, item) => {
                    return (
                      accumulator +
                      Number(item.cartQuantity || item.productOrder.quantity)
                    )
                  }, 0)
                : '0'}
            </div>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/about" className="navLink">
            ABOUT
          </Link>
          <Link to="/home">
            <img
              src="https://i.ibb.co/B6TFYcv/temp-Half-Baked-LOGO.png"
              height={100}
              className="navLogo"
            />
          </Link>
          <Link to="/login" className="navLink">
            Login
          </Link>
          <Link to="/signup" className="navLink">
            Sign Up
          </Link>
          <Link to="/cart" id="cart-icon-cont">
            <img
              src="https://images.all-free-download.com/images/graphiclarge/shopping_cart_icon_vector_red_background_280670.jpg"
              id="checkout-icon"
            />
            <div id="cart-qty">
              {console.log('cart', cart)}
              {cart.length
                ? cart.reduce((accumulator, item) => {
                    return accumulator + Number(item.cartQuantity)
                  }, 0)
                : '0'}
            </div>
          </Link>
        </div>
      )}
    </nav>
    <hr id="nav-hr" />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  // let cart = state.order.cart
  // let cartQuantity = cart[0]
  //   ? cart.reduce((accumulator, item) => {
  //     return accumulator + item.cartQuantity
  //     })
  //   : ''

  return {
    isLoggedIn: !!state.user.id,
    cart: state.order.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      console.log('beteween')
      dispatch(clearCart())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
