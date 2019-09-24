import React from 'react'
import {connect} from 'react-redux'

import {fetchHistory} from '../store/order'
import SingleOrderHistory from '../components/SingleOrderHistory'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.user.id)
  }
  render() {
    const {history} = this.props

    console.log('this is the orderhistory', history)
    console.log('this is the props', this.props)

    return (
      <div>
        {history.map(oneOrder => {
          return (
            <div key={oneOrder.id}>
              <SingleOrderHistory oneOrder={oneOrder} />
            </div>
          )
        })}
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
