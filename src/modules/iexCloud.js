import _ from 'lodash';
const axios = require('axios');
const moment = require('moment');
const IEX_CLOUD_API_TOKEN = 'pk_5ef603fffcda4550b39a006ea4399800'

const initialState = {
  data: {
    id: '',
    data: []
  },
  candlestick: {
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
        data: action.data,
        candlestick: action.candlestick
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
  return async dispatch => {
    dispatch({type: 'SET_DATA_REQUESTED'})
    const resp = await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/chart?token=${IEX_CLOUD_API_TOKEN}`)
    const data = _.map(resp.data, data => {
      const average = (data.open + data.close + data.high + data.low) / 4
      return {
        x: moment(data.date).format("MMM Do"),
        y: average > 100 ? Math.floor(average) : average.toFixed(2),
      }
    })
    const candlestick = _.map(resp.data, data => {
      const average = (data.open + data.close + data.high + data.low) / 4
      return {
        x: moment(data.date),
        y: average > 100 ? Math.floor(average) : average.toFixed(2),
        yHigh: data.high,
        yOpen: data.open,
        yClose: data.close,
        yLow: data.low,
        color: "#61DAFB"
      }
    })
    dispatch({type: 'SET_DATA', data: {id: symbol, data}, candlestick: {data: candlestick}})
  }
}


export const getMarketData = () => {
  return async dispatch => {
    const mostActiveResp = await axios.get(`https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${IEX_CLOUD_API_TOKEN}`)
    dispatch({type: 'GET_MARKET_DATA_MOST_ACTIVE', data: mostActiveResp.data})

    const gainersResp = await axios.get(`https://cloud.iexapis.com/v1/stock/market/list/gainers?token=${IEX_CLOUD_API_TOKEN}`)
    dispatch({type: 'GET_MARKET_DATA_GAINERS', data: gainersResp.data})

    const losersResp = await axios.get(`https://cloud.iexapis.com/v1/stock/market/list/losers?token=${IEX_CLOUD_API_TOKEN}`)
    dispatch({type: 'GET_MARKET_DATA_LOSERS', data: losersResp.data})
  }
}
