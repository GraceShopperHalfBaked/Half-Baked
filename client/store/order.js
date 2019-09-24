import axios from 'axios'
import history from '../history'

//define localstorage
let localStorage = window.localStorage

// if (window) {
//   localStorage = window.localStorage
// }

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART_QUANTITY = 'UPDATED_CART_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
// const CHECKOUT = 'CHECKOUT'
const CLEARED_CART = 'CLEARED_CART'
const GOT_HISTORY = 'GOT_HISTORY'

// ACTION CREATORS

const gotCart = cart => ({
  type: GOT_CART_FROM_SERVER,
  cart
})

const addedToCart = product => {
  return {
    type: ADDED_TO_CART,
    product
  }
}

const updatedCartQuantity = product => {
  return {
    type: UPDATED_CART_QUANTITY,
    product
  }
}

export const clearedCart = () => {
  return {
    type: CLEARED_CART
  }
}

/// ACTION CREATOR FOR REMOVING CART ITEM
const removeFromCart = prodId => {
  return {
    type: REMOVE_CART_ITEM,
    prodId
  }
}

// ACTION CREATOR FOR CHECKOUT
// const checkout = () => ({
//   type: CHECKOUT
// })

const gotHistory = orders => ({
  type: GOT_HISTORY,
  orders
})

// THUNK FOR GETTING HISTORY
export const fetchHistory = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}/history`)
      dispatch(gotHistory(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK FOR USER CHECKOUT
export const processCheckout = orderId => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${orderId}/checkout`)
      dispatch(clearedCart())
      history.push('/checkout')
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK FOR GUEST CHECKOUT
export const processGuestCheckout = () => {
  return async dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'))
      await axios.post('/api/orders/guest/checkout', cart)
      localStorage.removeItem('cart')
      dispatch(clearedCart())
      history.push('/checkout')
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK FOR FETCHING CART
export const fetchCart = userId => {
  return async dispatch => {
    try {
      if (userId) {
        const {data} = await axios.get(`/api/orders/${userId}`)
        dispatch(gotCart(data))
      } else {
        console.log('doing this now')
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch(gotCart(cart))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK CREATOR for CART
export const clearCart = () => {
  return dispatch => {
    dispatch(clearedCart())
  }
}

export const addToCart = product => {
  return async dispatch => {
    try {
      // if user is logged in, continue with server post request
      if (product.userId) {
        const {data} = await axios.post('/api/orders', product)
        dispatch(addedToCart(data))
      } else {
        // if user is guest, if first item added to cart, then create cart on localStorage, initialized with the product
        if (!localStorage.getItem('cart')) {
          let cart = [product]
          localStorage.setItem('cart', JSON.stringify(cart))

          //user is guest, cart already exists on local storage
        } else {
          let cart = JSON.parse(localStorage.getItem('cart'))
          let productAlreadyInCart = false
          // check to see if item is aleady in cart, if so, update that cart quantity, and set prodInCart to true
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
              cart[i].cartQuantity = product.cartQuantity
              productAlreadyInCart = true
              localStorage.setItem('cart', JSON.stringify(cart))
              return dispatch(updatedCartQuantity(product))
            }
          }

          // if product not already in cart, then add it to end of cart
          if (productAlreadyInCart === false) {
            cart.push(product)
          }
          localStorage.setItem('cart', JSON.stringify(cart))
        }

        dispatch(addedToCart(product))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateCartQuantity = product => {
  return async dispatch => {
    try {
      console.log('upprod', product)
      const {data} = await axios.put('/api/orders', product)
      console.log('data', data)
      dispatch(updatedCartQuantity(product))
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK FOR REMOVING CART ITEM
export const removingCartItem = (orderId, prodId) => {
  return async dispatch => {
    try {
      if (orderId !== null) {
        await axios.delete(`/api/orders/${orderId}/${prodId}`) // NEED TO WRITE A ROUTER FOR THIS
        dispatch(removeFromCart(prodId))
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart = cart.filter(item => {
          return item.id !== prodId
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(removeFromCart(prodId))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  history: [],
  cart: []
}

// REDUCER
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART_FROM_SERVER:
      if (action.cart === null) {
        return state
      } else {
        return {
          ...state,
          cart: [...action.cart]
        }
      }

    case ADDED_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product]
      }

    case CLEARED_CART:
      return {
        ...state,
        cart: []
      }

    case UPDATED_CART_QUANTITY:
      // eslint-disable-next-line no-case-declarations
      let newCartProducts = [...state.cart].map(product => {
        if (product.id === action.product.id) {
          product.cartQuantity = action.product.cartQuantity
        }

        return product
      })

      return {
        ...state,
        cart: newCartProducts
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => {
          return item.id !== action.prodId
        })
      }

    // case CHECKOUT:
    //   return {
    //     ...state,
    //     cart: []
    //   }

    case GOT_HISTORY:
      return {
        ...state,
        history: action.orders
      }

    default:
      return state
  }
}

export default orderReducer
