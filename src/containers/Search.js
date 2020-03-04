
import _ from 'lodash';
import React, { useState } from 'react'
import { Search } from 'semantic-ui-react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setData } from '../modules/iexCloud';

const StockSearch = ({stocks, changePage}) => {
  const initialState = { isLoading: false, results: _.take(stocks, 10), value: '' }
  const [state, updateState] = useState(initialState);

  const handleResultSelect = (e, { result }) => {
    updateState({value: result.title})
    setData(result.title)
    changePage(result.title.toLowerCase())
  }

  const handleSearchChange = (e, { value }) => {
    if (value.length < 1) {
      updateState(initialState)
    } else {
      const previewResults = _.filter(stocks, (company) => matchesSearch(value, company))
      const pageOfPreviewResults = _.take(previewResults, 10)
      updateState({value, results: pageOfPreviewResults})
    }
  }

  const matchesSearch = (value, company) => {
    return _.includes(company.title.toLowerCase(), value.toLowerCase()) || 
      _.includes(company.description.toLowerCase(), value.toLowerCase())
  }

  return (
    <Search
      loading={state.isLoading}
      placeholder='Search for a stock by name or symbol...'
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={state.results}
      value={state.value}
    />
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setData,
      changePage: (stock) => push(`/stocks/${stock}`)
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(StockSearch)
