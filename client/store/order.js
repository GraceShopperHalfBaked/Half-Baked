import axios from 'axios'

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART_QUANTITY = 'UPDATED_CART_QUANTITY'

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

// THUNK CREATOR for CART
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
      const {data} = await axios.put('/api/orders', product)
      dispatch(updatedCartQuantity(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  history: [],
  cart: {
    products: []
  }
}

// REDUCER
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART_FROM_SERVER:
      return {
        ...state,
        cart: action.cart
      }

    case ADDED_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          orderId: action.product.orderId,
          products: [...state.cart.products, action.product]
        }
      }

    case UPDATED_CART_QUANTITY:
      // eslint-disable-next-line no-case-declarations
      let newCartProducts = [...state.cart.products].map(product => {
        if (product.id === action.product.id) {
          product.cartQuantity = action.product.cartQuantity
        }
        return product
      })

      return {
        ...state,
        cart: {
          ...state.cart,
          products: newCartProducts
        }
      }

    default:
      return state
  }
}

export default orderReducer
