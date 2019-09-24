import React from 'react'

const SingleOrderHistory = props => {
  const {oneOrder} = props
  return (
    <div>
      <h3>{oneOrder.createdAt}</h3>
      <div>
        <div>Order number: {oneOrder.id}</div>
        <div>Order status: {oneOrder.cartStatus}</div>
        <div>Order total: {(oneOrder.totalOrderPrice / 100).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default SingleOrderHistory
