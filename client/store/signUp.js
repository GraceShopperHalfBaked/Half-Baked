import axios from 'axios'

//Action type
const CREATE_USER = 'CREATE_USER'

//Action creator
const createUser = user => ({
  type: CREATE_USER,
  user
})

//Thunk creator
export const createNewUser = user => {
  return dispatch => {
    axios
      .post('/auth/signup', user)
      .then(res => res.data)
      .then(newUser => {
        dispatch(createUser(newUser))
      })
  }
}
