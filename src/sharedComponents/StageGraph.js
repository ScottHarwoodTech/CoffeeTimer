import React from 'react';
import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => 'rgba(0,0,0, 1)',
  propsForBackgroundLines: {
    stroke: '#555',
  },
  strokeWidth: 1,
};

const StageGraph = ({stages, maxWater, time, tickRate}) => {
  const xData = stages.reduce(
    (accum, stage) => {
      const xValue = accum[accum.length - 1];
      return [...accum, xValue + stage.time];
    },
    [0],
  );
  const yData = stages.reduce(
    (accum, stage) => {
      const yValue = accum[accum.length - 1];
      return [...accum, yValue + stage.waterAmount];
    },
    [0],
  );
  const timeGraph = [];
  if (time !== undefined) {
    yData.slice(0, yData.length - 2).forEach((start, i) => {
      const end = yData[i + 1];
      const numberOfTicks = (xData[i + 1] - xData[i]) * tickRate;
      const distancePerTick = (end - start) / numberOfTicks;
      for (let x = 0; x <= numberOfTicks; x++) {
        timeGraph.push(start + distancePerTick * x);
      }
    });
  }
  return (
    <View>
      <LineChart
        withShadow={false}
        fromZero
        data={{
          labels: xData,
          datasets: [
            {
              data: yData,
            },
          ],
        }}
        height={220}
        width={Dimensions.get('window').width - 30}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default StageGraph;
/*<View style={{alignItems: 'center', flexDirection:'row'}}>
      <YAxis
        data={yData}
        svg={{fill: 'grey', fontSize: 10}}
        contentInset={contentInset}
        style={{height: 200}}
      />
      <LineChart
        grid
        contentInset={contentInset}
        style={{width: 300, height: 200}}
        data={yData}
        xAccessor={({item}) => item}
        svg={{stroke: 'rgb(134, 65, 244)'}}
      />
      <XAxis
        style={{width: 300}}
        data={xData}
        xAccessor={({item}) => item}
        contentInset={{left: 10, right: 10}}
        svg={{fontSize: 10, fill: 'black'}}
      />
    </View>
    */
