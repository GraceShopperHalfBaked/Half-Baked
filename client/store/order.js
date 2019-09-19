import axios from 'axios'

//define localstorage
const localStorage = window.localStorage

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART_QUANTITY = 'UPDATED_CART_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

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

/// ACTION CREATOR FOR REMOVING CART ITEM
const removeFromCart = id => {
  return {
    type: REMOVE_CART_ITEM,
    id
  }
}

// THUNK CREATOR for CART
export const fetchCart = userId => {
  return async dispatch => {
    try {
      if (userId) {
        const {data} = await axios.get(`/api/orders/${userId}`)
        dispatch(gotCart(data))
      } else {
        localStorage.setItem(product.name, JSON.stringify(product))
        dispatch(addedToCart(JSON.parse(localStorage.getItem(product.name))))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = product => {
  return async dispatch => {
    try {
      if (product.userId) {
        const {data} = await axios.post('/api/orders', product)
        dispatch(addedToCart(data))
      } else {
        // let cart = JSON.parse(localStorage.getItem('cart'))
        // let productAlreadyInCart = false
        // for (let i = 0; i < cart.length; i++) {
        //   if (cart[i].id === product.id) {
        //     cart[i].cartQuantity = product.cartQuantity
        //     localStorage.setItem('cart', JSON.stringify(cart))
        //     productAlreadyInCart = true
        //     break
        //   }
        // }
        // if (!productAlreadyInCart) {
        //   cart[product.name]
        //   dispatch(addedToCart(JSON.parse(localStorage.getItem(product.name))))
        // } else {
        // }
        // localStorage.setItem(cart[product.name], JSON.stringify(product))
        // dispatch(addedToCart(JSON.parse(localStorage.getItem(product.name))))
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
export const removingCartItem = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/${id}`) // NEED TO WRITE A ROUTER FOR THIS
      dispatch(removeFromCart(id))
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
          return item.id !== action.id
        })
      }

    default:
      return state
  }
}

export default orderReducer
