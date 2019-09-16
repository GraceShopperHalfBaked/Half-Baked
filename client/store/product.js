import axios from 'axios'

//ACTION TYPE
const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'

//action creator
export const gotProducts = products => {
  return {
    type: GOT_PRODUCTS_FROM_SERVER,
    products
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

    default:
      return state
  }
}

export default productReducer
