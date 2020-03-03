import _ from 'lodash';
const axios = require('axios');
const moment = require('moment');
const IEX_CLOUD_API_TOKEN = 'pk_212c74cb0280453baa89ddb99e331fd1 '

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
        isIncrementing: true
      }

    case 'SET_DATA':
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing,
        data: action.data
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
