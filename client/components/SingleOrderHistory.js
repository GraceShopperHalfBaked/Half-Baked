import React from 'react'

const SingleOrderHistory = props => {
  const {oneOrder} = props

  return (
    <div>
      <div>
        {oneOrder.products.map(itemInOrder => {
          return (
            <div key={itemInOrder.id}>
              <div id="sing-cart-item-checkout">
                <div id="img-checkout">
                  <img src={itemInOrder.imageUrl} className="prod-img-cart" />
                </div>

                <div>
                  <h3 id="bold-this-name">
                    <p className="cart-deets">{itemInOrder.name}</p>
                  </h3>
                  <p className="cart-deets">
                    Price: $
                    {(
                      itemInOrder.currentPrice *
                      itemInOrder.productOrder.quantity /
                      100
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <hr id="hr-cart-checkout" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleOrderHistory
