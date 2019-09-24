import React, {Component} from 'react'
import styled from 'styled-components'
import ee from 'event-emitter'

const Container = styled.div`
  background-color: #ec292d;
  color: white;
  padding: 16px;
  position: fixed;
  top: ${props => props.top}px;
  right: 30px;
  z-index: 999;
  transition: top 0.25s ease;
  border-radius: 15px;

  > i {
    margin-left: 8px;
  }
`
const emitter = new ee()

export const notify = msg => {
  emitter.emit('notification', msg)
}
export default class LoginNotif extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: -100
    }
    this.timeOut = null
    emitter.on('notification', msg => {
      this.onShow(msg)
    })
  }
  onShow = msg => {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
      this.setState(
        {
          top: -100,
          msg: ''
        },
        () => {
          this.timeOut = setTimeout(() => {
            this.showNotification(msg)
          }, 250)
        }
      )
    } else {
      this.showNotification(msg)
    }
  }

  showNotification = msg => {
    this.setState(
      {
        top: 90,
        msg
      },
      () => {
        this.timeOut = setTimeout(() => {
          this.setState({
            top: -100
          })
        }, 3000)
      }
    )
  }
  render() {
    return (
      <div>
        <Container top={this.state.top}>
          Welcome back USER!
          <i className="fa fa-bell" />
        </Container>
      </div>
    )
  }
}
