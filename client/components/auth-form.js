import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, clearCart} from '../store'
import LoginNotif from './Notification/loginNotif'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="form-div">
      <div id="sides" />
      <div id="middle-form">
        <div id="split-form">
          <div id="middle-bit">
            <form onSubmit={handleSubmit} name={name} id="within-form">
              <div className="form-space">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="form-space">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="form-space">
                <button type="submit">{displayName}</button>
                <LoginNotif />
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <div>
              <h3 id="nav-or">----- or -----</h3>
            </div>
            {/* <a href="/auth/google">{displayName} with Google</a> */}
            <a href="/auth/google">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdBIMn1pBU7a38f2R-YS4gNnapOyWNTfp_IKorWOTvQZimyuk"
                id="google-butt"
              />
            </a>
          </div>

          <div id="middle-bit-r">
            <h1 id="auth-greet-1">{displayName}</h1>
            <p id="auth-greet-2">and take a bite!</p>

            <img
              src="https://www.stickpng.com/assets/images/580b57fbd9996e24bc43c0b6.png"
              id="login-cake"
            />
          </div>
        </div>
      </div>
      <div id="sides" />
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
      dispatch(clearCart())
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
