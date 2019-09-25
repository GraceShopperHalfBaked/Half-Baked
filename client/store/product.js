import axios from 'axios'

//ACTION TYPE
const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'
const GOT_SELECTED_PRODUCT_FROM_SERVER = 'GOT_SELECTED_PRODUCT_FROM_SERVER'

//action creator
export const gotProducts = products => {
  return {
    type: GOT_PRODUCTS_FROM_SERVER,
    products
  }
}

const gotSelectedProduct = product => {
  return {
    type: GOT_SELECTED_PRODUCT_FROM_SERVER,
    product
  }
}

//thunk creator
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(gotProducts(products))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSelectedProduct = productId => {
  return async dispatch => {
    try {
      const {data: selectedProduct} = await axios.get(
        `/api/products/${productId}`
      )
      dispatch(gotSelectedProduct(selectedProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

// initial state
const initialState = {
  all: [],
  selected: {}
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return {
        ...state,
        all: action.products
      }

    case GOT_SELECTED_PRODUCT_FROM_SERVER:
      return {
        ...state,
        selected: action.product
      }

    default:
      return state
  }
}

export default productReducer
