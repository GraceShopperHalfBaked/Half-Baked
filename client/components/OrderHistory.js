import React from 'react'
import {connect} from 'react-redux'

import {fetchHistory} from '../store/order'
import SingleOrderHistory from '../components/SingleOrderHistory'
import OrderHistorySidebar from './OrderHistorySidebar'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.user.id)
  }
  render() {
    const {history} = this.props

    return (
      <div className="cart-main">
        <div>
          {history.length > 0 ? (
            <div>
              {history.map(oneOrder => {
                return (
                  <div key={oneOrder.id} className="cart-main">
                    <div>
                      <SingleOrderHistory oneOrder={oneOrder} />
                    </div>
                    <div>
                      <OrderHistorySidebar oneOrder={oneOrder} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>There is no existing order history</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    history: state.order.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHistory: userId => dispatch(fetchHistory(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
