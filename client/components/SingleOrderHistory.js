import React from 'react'

const SingleOrderHistory = props => {
  const {oneOrder} = props

  return (
    <div>
      <h3>{oneOrder.createdAt.slice(0, 10)}</h3>
      <div>
        <div>Order Number: {oneOrder.id}</div>
        <div>Order Status: {oneOrder.cartStatus}</div>
        <div>Order Total: {(oneOrder.totalOrderPrice / 100).toFixed(2)}</div>
      </div>
      <div>
        Order Details:
        {oneOrder.products.map(itemInOrder => {
          return (
            <div key={itemInOrder.id}>
              <div>{itemInOrder.name}</div>
              <div>
                {(
                  itemInOrder.currentPrice *
                  itemInOrder.productOrder.quantity /
                  100
                ).toFixed(2)}
              </div>
              <img src={itemInOrder.imageUrl} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleOrderHistory
