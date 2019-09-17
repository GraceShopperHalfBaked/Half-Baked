import axios from 'axios'

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'

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

// THUNK CREATOR for CART
export const fetchCart = orderId => {
  return async dispatch => {
    try {
      // const {data} = await axios.get(`WHATEVER THIS ROUTE IS ${orderId}`)
      // dispatch(gotCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = product => {
  console.log('product', product)
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', product)
      dispatch(addedToCart(data))
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
        cart: action.cart
      }

    case ADDED_TO_CART:
      return {
        ...state,
        cart: action.cart
      }

    default:
      return state
  }
}

export default orderReducer
