import React from 'react'
import { useParams } from "react-router-dom";
import { ResponsiveLine } from '@nivo/line'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { increment, incrementAsync, decrement, decrementAsync, setData } from '../../modules/counter'
import { Statistic } from 'semantic-ui-react'


const Stocks = ({stockData}) => {
  let { stockId } = useParams();
  return (
    <div>
      <h1>{stockId.toUpperCase()}</h1>
      <div className="fill">
        {stockData ? <ResponsiveLine
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
        /> : null}
      </div>
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
  stockData: counter.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      setData
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks)