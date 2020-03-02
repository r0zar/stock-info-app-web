import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Stocks from '../stocks'
import { Container, Divider, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import StockSearch from '../Search'
import _ from 'lodash';
import * as companies from '../../companylist.json'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const stocks = _.map(companies.default, (company) => { return {title: company.Symbol, description: company.Name}})


const App = props => (
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
      <Route exact path="/about-us" component={About} />
      <Route path="/stocks/:stockId" component={Stocks} />
    </Container>

    <Segment inverted vertical style={{ margin: '8em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 1' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 2' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 3' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Footer Header' />
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
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
)

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goHome: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
