import axios from 'axios'

//define localstorage
const localStorage = window.localStorage

// ACTION TYPES
const GOT_CART_FROM_SERVER = 'GOT_CART_FROM_SERVER'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART_QUANTITY = 'UPDATED_CART_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CHECKOUT = 'CHECKOUT'
const CLEARED_CART = 'CLEARED_CART'

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

export const clearedCart = () => {
  console.log('*********************')
  return {
    type: CLEARED_CART
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
      if (product.userId) {
        const {data} = await axios.post('/api/orders', product)
        dispatch(addedToCart(data))
      } else {
        // console.log('local', (localStorage.getItem('cart')))
        if (!localStorage.getItem('cart')) {
          console.log('here')
          let cart = [product]
          localStorage.setItem('cart', JSON.stringify(cart))
        } else {
          console.log('orhere')
          let cart = JSON.parse(localStorage.getItem('cart'))
          let productAlreadyInCart = false
          for (let i = 0; i < cart.length; i++) {
            console.log('y', cart[i].id === product.id)
            if (cart[i].id === product.id) {
              console.log('entered here')
              cart[i].cartQuantity = product.cartQuantity
              productAlreadyInCart = true
              localStorage.setItem('cart', JSON.stringify(cart))
              return dispatch(updatedCartQuantity(product))
            }
          }
          if (productAlreadyInCart === false) {
            cart.push(product)
          }
          localStorage.setItem('cart', JSON.stringify(cart))
        }

        dispatch(addedToCart(product))

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
