import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setData
} from '../../modules/counter'

const Home = props => (
  <div>
    <h1>Home</h1>
    
    <div className="fill">
      <p>
        <br />
        Welcome to the stock info app.
        <br /><br />
        Search for a stock to get started!
      </p>
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
