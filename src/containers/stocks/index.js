import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { ResponsiveLine } from '@nivo/line'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setData } from '../../modules/counter'
import { Statistic } from 'semantic-ui-react'


const Stocks = ({stockData, setData}) => {
  const { stockId } = useParams();
  const symbol = stockId.toUpperCase()
  useEffect(() => {
    if (!stockData.data.length || (stockData.id !== symbol)) {
      setData(symbol)
    }
  })
  return (
    <div>
      <h1>{symbol}</h1>
      <div className="fill">
        {stockData.data.length > 0 ? <ResponsiveLine
          data={[stockData]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Date',
            legendOffset: 60,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Price (USD)',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          enableGridX={false}
          colors={{ scheme: 'accent' }}
          pointSize={10}
          lineWidth={13}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          areaBlendMode="overlay"
          areaOpacity={0}
          tooltip={(e) => {
            return (
              <Statistic>
                <Statistic.Value>${e.point.data.y}</Statistic.Value>
                <Statistic.Label>USD</Statistic.Label>
              </Statistic>
            )
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        /> : <h4>No data to show</h4>}
      </div>
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  stockData: counter.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setData
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks)