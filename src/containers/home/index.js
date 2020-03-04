import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setData
} from '../../modules/iexCloud'
import { Message } from 'semantic-ui-react'

const Home = props => (
  <div>
    <h1>Home</h1>
    <div>Welcome to the Stock Info App.</div>
    
    <div className="fill body">
      <Message>
        <Message.Header>Site Features</Message.Header>
          <Message.List>
            <Message.Item>Auto-complete search for company stocks.</Message.Item>
            <Message.Item>Quick access to highest volume, and recent gainer / loser stocks.</Message.Item>
            <Message.Item>Responsive user interface on most devices.</Message.Item>
            <Message.Item>Line graph charts for last 30 days daily average price.</Message.Item>
          </Message.List>
      </Message>
    </div>
  </div>
)

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setData,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
