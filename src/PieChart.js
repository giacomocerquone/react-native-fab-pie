import React, { PureComponent } from 'react';
import { View } from 'react-native';
import * as shape from 'd3-shape';
import { Surface, Group, Shape } from '@react-native-community/art';

export default class PieChart extends PureComponent {
  state = {
    height: 0,
    width: 0,
  };

  _onLayout = ({
    nativeEvent: {
      layout: { height, width },
    },
  }) => this.setState({ height, width });

  _calculateRadius(arg, max, defaultVal) {
    if (typeof arg === 'string') {
      return (arg.split('%')[0] / 100) * max;
    }
    if (arg) {
      return arg;
    } else {
      return defaultVal;
    }
  }

  render() {
    const {
      data,
      innerRadius,
      outerRadius,
      padAngle,
      pieStyle,
      elevation,
      indexToFocus,
      startAngle,
      endAngle,
      animate,
      valueAccessor = ({ item }) => item.value,
      sort = (a, b) => a + b,
    } = this.props;

    const { height, width } = this.state;

    const maxRadius = Math.min(width, height) / 2;

    const _outerRadius = this._calculateRadius(
      outerRadius,
      maxRadius,
      maxRadius,
    );
    const _innerRadius = this._calculateRadius(
      innerRadius || '50%',
      maxRadius,
      0,
    );

    const arcs = data.map((item, index) => {
      const _enhancedOuterRadius =
        indexToFocus === index ? _outerRadius + elevation : _outerRadius;

      const arc = shape
        .arc()
        .outerRadius(_enhancedOuterRadius)
        .innerRadius(_innerRadius)
        .padAngle(padAngle || 0.05); // Angle between sections

      item.arc &&
        Object.entries(item.arc).forEach(([key, value]) => {
          if (typeof arc[key] === 'function') {
            if (typeof value === 'string') {
              arc[key]((value.split('%')[0] / 100) * _outerRadius);
            } else {
              arc[key](value);
            }
          }
        });

      return arc;
    });

    const pieSlices = shape
      .pie()
      .value(d => valueAccessor({ item: d }))
      .sort(sort)
      .startAngle(startAngle || 0)
      .endAngle(animate ? endAngle : Math.PI * 2)(data);

    return (
      <View style={pieStyle} onLayout={this._onLayout}>
        {height > 0 && width > 0 && (
          <Surface width={width} height={height}>
            <Group x={width / 2} y={height / 2}>
              {pieSlices.map((slice, index) => {
                const { key, color } = data[index];
                return <Shape key={key} d={arcs[index](slice)} fill={color} />;
              })}
            </Group>
          </Surface>
        )}
      </View>
    );
  }
}
