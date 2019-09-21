import axios from 'axios'

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART_QUANTITY = 'UPDATED_CART_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CHECKOUT = 'CHECKOUT'

// ACTION CREATORS
const checkout = cart => ({
  type: CHECKOUT,
  cart
})

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

/// ACTION CREATOR FOR REMOVING CART ITEM
const removeFromCart = (orderId, prodId) => {
  return {
    type: REMOVE_CART_ITEM,
    orderId,
    prodId
  }
}

// THUNK CREATOR for CART
export const processCheckout = cart => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', cart)
      dispatch(checkout(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(gotCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', product)
      dispatch(addedToCart(data))
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
      await axios.delete(`/api/orders/${orderId}/${prodId}`) // NEED TO WRITE A ROUTER FOR THIS
      dispatch(removeFromCart(orderId, prodId))
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
      return {
        ...state,
        cart: [...action.cart]
      }

    case ADDED_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product]
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
    // REMOVING CART ITEM REDUCER
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => {
          return item.id !== action.orderId && item.id !== action.prodId
        })
      }

    case CHECKOUT:
      return {
        ...state,
        cart: [...state.cart, action.cart]
      }
    default:
      return state
  }
}

export default orderReducer
