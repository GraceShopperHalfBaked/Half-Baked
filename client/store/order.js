import axios from 'axios'

// ACTION TYPES
const GOT_ORDERS_FROM_SERVER = 'GOT_ORDERS_FROM_SERVER'
const GOT_SINGLE_ORDER_FROM_SERVER = 'GOT_SINGLE_ORDER_FROM_SERVER'

// ACTION CREATORS
const gotOrders = orders => ({
  type: GOT_ORDERS_FROM_SERVER,
  orders
})

const gotSingleOrder = order => ({
  type: GOT_SINGLE_ORDER_FROM_SERVER,
  order
})

// THUNK CREATOR for ALL ORDERS
export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(gotOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// THUNK CREATOR for SINGLE ORDER
export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`WHATEVER THIS ROUTE IS ${orderId}`)
      dispatch(gotSingleOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  all: [],
  selected: {}
}

// REDUCER
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS_FROM_SERVER:
      return {
        ...state,
        all: action.orders
      }
    case GOT_SINGLE_ORDER_FROM_SERVER:
      return {
        ...state,
        selected: action.order
      }
    default:
      return state
  }
}

export default orderReducer
