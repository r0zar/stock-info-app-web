import React, { useEffect, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import Stocks from '../stocks'
import { Container, Divider, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import StockSearch from '../Search'
import _ from 'lodash';
import * as companies from '../../companylist.json'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getMarketData } from '../../modules/counter'
const stocks = _.map(companies.default, (company) => { return {title: company.Symbol, description: company.Name}})


const App = props => {
  useEffect(() => {
    if (!props.mostActive) {
      props.getMarketData()
    }
  })
  return (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header onClick={() => props.goHome()}>
          <Image size='mini' src='/logo192.png' style={{ marginRight: '1.5em' }} />
          Stock Info App
        </Menu.Item>
        <Menu.Item>
          <StockSearch stocks={stocks}></StockSearch>
        </Menu.Item>
      </Container>
    </Menu>
    <Container text style={{ marginTop: '7em' }}>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route path="/stocks/:stockId" component={Stocks} />
    </Container>

    <Segment inverted vertical style={{ margin: '8em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Most Active' />
            <List link inverted>
              { props.mostActive ? <Fragment>
                <List.Item as='a' onClick={() => props.goTo(props.mostActive[0].symbol)}>{props.mostActive[0].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.mostActive[1].symbol)}>{props.mostActive[1].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.mostActive[2].symbol)}>{props.mostActive[2].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.mostActive[3].symbol)}>{props.mostActive[3].symbol}</List.Item>
              </Fragment> : null }
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Gainers' />
            <List link inverted>
              { props.gainers ? <Fragment>
                <List.Item as='a' onClick={() => props.goTo(props.gainers[0].symbol)}>{props.gainers[0].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.gainers[1].symbol)}>{props.gainers[1].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.gainers[2].symbol)}>{props.gainers[2].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.gainers[3].symbol)}>{props.gainers[3].symbol}</List.Item>
              </Fragment> : null }
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Losers' />
            <List link inverted>
              { props.losers ? <Fragment>
                <List.Item as='a' onClick={() => props.goTo(props.losers[0].symbol)}>{props.losers[0].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.losers[1].symbol)}>{props.losers[1].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.losers[2].symbol)}>{props.losers[2].symbol}</List.Item>
                <List.Item as='a' onClick={() => props.goTo(props.losers[3].symbol)}>{props.losers[3].symbol}</List.Item>
              </Fragment> : null }
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Powered by IEX Cloud API' />
            <p>
              <a href='https://iexcloud.io/'>Click here to learn more</a>
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src='/logo192.png' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)}

const mapStateToProps = ({ counter }) => ({
  mostActive: counter.mostActive,
  gainers: counter.gainers,
  losers: counter.losers,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMarketData,
      goHome: () => push('/'),
      goTo: (symbol) => push(`/stocks/${symbol}`)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
