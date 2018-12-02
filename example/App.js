import React from 'react';
import { View } from 'react-native';
import Pie from 'react-native-fab-pie';
import MyLabels from './MyLabels';

export default class MyApp extends React.PureComponent {
  constructor(props) {
    super(props);
    const data = [50, 20, 4, 10];
    const colors = ['A40E4C', '2C2C54', 'ACC3A6', 'F5D6BA'];

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => {
        const toRet = {
          value,
          title: `title-${index}`,
          color: `#${colors[index]}`,
          key: `pie-${index}`,
        };
        return toRet;
      });

    this.state = {
      pieData,
    };
  }

  render() {
    return (
      <View
        style={{
          marginVertical: 40,
          marginHorizontal: 10,
        }}
      >
        <Pie
          containerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          pieStyle={{
            width: 260,
            height: 260,
            flex: 1,
          }}
          outerRadius={120}
          innerRadius={45}
          data={this.state.pieData}
        >
          <MyLabels />
        </Pie>
      </View>
    );
  }
}
