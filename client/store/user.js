import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CONTINUE_AS_GUEST = 'CONTINUE_AS_GUEST'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const guestUser = {guest: true}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const continueAsGuest = () => ({type: CONTINUE_AS_GUEST, guestUser})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')

    if (res.data === 'guest') {
      dispatch(continueAsGuest(guestUser))
    } else {
      dispatch(getUser(res.data || defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const guest = () => async dispatch => {
  try {
    await axios.get('/auth/guest')
    // console.log('------------entered')
    dispatch(continueAsGuest())
    // history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CONTINUE_AS_GUEST:
      return action.guestUser
    default:
      return state
  }
}
