import axios from 'axios'

// ACTION TYPES
const GOT_SINGLE_ORDER_FROM_SERVER = 'GOT_SINGLE_ORDER_FROM_SERVER'

// ACTION CREATORS
const gotSingleOrder = order => ({
  type: GOT_SINGLE_ORDER_FROM_SERVER,
  order
})

// THUNK CREATOR for SINGLE ORDER
export const fetchSingleCart = orderId => {
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
  selected: {}
}

// REDUCER
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
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
