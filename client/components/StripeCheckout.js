import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import STRIPE_PUBLISHABLE from './constants/stripe'
// import PAYMENT_SERVER_URL from './constants/server'
import {processCheckout} from '../store/order'
import store from '../store'

const CURRENCY = 'USD'
const fromUSDToCent = amount => amount * 100
const successPayment = orderId => {
  // console.log('data', data)
  store.dispatch(processCheckout(orderId))
  // alert('Payment Successful')
}
const errorPayment = data => {
  alert('Payment Error')
}
const onToken = (amount, description, orderId) => token => {
  console.log('and1ordId', orderId)
  // const {data} = await axios.put(`/api/orders/${orderId}/checkout`)
  // console.log('data', data)

  console.log('and2')
  axios
    .post(`/api/orders/${orderId}/stripeCheckout`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment(orderId))
    .catch(errorPayment)
}

const StrCheckout = ({name, description, amount, orderId}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description, orderId)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)
export default StrCheckout
