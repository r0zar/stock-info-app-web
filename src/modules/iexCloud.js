import _ from 'lodash';
const axios = require('axios');
const moment = require('moment');
const IEX_CLOUD_API_TOKEN = 'pk_38cc82908fb44e6d8ac659aba464ad99'

const initialState = {
  data: {
    id: '',
    data: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_REQUESTED':
      return {
        ...state,
      }

    case 'SET_DATA':
      return {
        ...state,
        data: action.data
      }

    case 'GET_MARKET_DATA_MOST_ACTIVE':
      return {
        ...state,
        mostActive: action.data
      }

    case 'GET_MARKET_DATA_GAINERS':
      return {
        ...state,
        gainers: action.data
      }

      case 'GET_MARKET_DATA_LOSERS':
        return {
          ...state,
          losers: action.data
        }
    
    default:
      return state
  }
}


export const setData = (symbol) => {
  return dispatch => {
    dispatch({type: 'SET_DATA_REQUESTED'})
    // const range = '1m'
    // const date = '2017-04-03'
    axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/chart?token=${IEX_CLOUD_API_TOKEN}`)
    .then(resp => {
      const data = _.map(resp.data, data => {
        const average = (data.open + data.close + data.high + data.low) / 4
        return {
          x: moment(data.date).format("MMM Do"),
          y: average > 100 ? Math.floor(average) : average.toFixed(2)
        }
      })
      dispatch({
        type: 'SET_DATA',
        data: {
          id: symbol,
          data
        }
      })
    })
  }
}


export const getMarketData = () => {
  return dispatch => {
    axios.get(`https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${IEX_CLOUD_API_TOKEN}`)
    .then(resp => {
      dispatch({
        type: 'GET_MARKET_DATA_MOST_ACTIVE',
        data: resp.data
      })
    })
    axios.get(`https://cloud.iexapis.com/v1/stock/market/list/gainers?token=${IEX_CLOUD_API_TOKEN}`)
    .then(resp => {
      dispatch({
        type: 'GET_MARKET_DATA_GAINERS',
        data: resp.data
      })
    })
    axios.get(`https://cloud.iexapis.com/v1/stock/market/list/losers?token=${IEX_CLOUD_API_TOKEN}`)
    .then(resp => {
      dispatch({
        type: 'GET_MARKET_DATA_LOSERS',
        data: resp.data
      })
    })
  }
}
