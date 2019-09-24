import React from 'react'
import {connect} from 'react-redux'

class OrderHistory extends React.Component {
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  history: state.history
})

export default connect(mapStateToProps)(OrderHistory)
