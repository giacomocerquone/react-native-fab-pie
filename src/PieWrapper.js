import React from 'react';
import { View, Animated } from 'react-native';
import { ART, Easing } from 'react-native';
import PieChart from './PieChart';

const { Surface, Group, Shape } = ART;

const AnimatedPie = Animated.createAnimatedComponent(PieChart);

export default class PieWrapper extends React.PureComponent {
  state = {
    endAngle: new Animated.Value(0),
    outerElevation: new Animated.Value(0),
    indexToFocus: null,
  };

  componentDidMount() {
    Animated.timing(this.state.endAngle, {
      toValue: 2,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    }).start();
  }

  focus = indexToFocus => {
    Animated.timing(this.state.outerElevation, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.quad),
    }).start(() => {
      this.setState({ indexToFocus });
      Animated.timing(this.state.outerElevation, {
        toValue: 10,
        duration: 200,
        easing: Easing.inOut(Easing.quad),
      }).start();
    });
  };

  render() {
    const {
      data,
      dataPoints,
      innerRadius,
      outerRadius,
      padAngle,
      pieStyle,
      containerStyle,
      children,
      startAngle,
      valueAccessor,
      sort,
    } = this.props;
    const { outerElevation, indexToFocus, endAngle } = this.state;

    const animEndAngle = Animated.multiply(endAngle, Math.PI);

    return (
      <View style={containerStyle}>
        <AnimatedPie
          pieStyle={pieStyle}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          endAngle={animEndAngle}
          valueAccessor={valueAccessor}
          sort={sort}
          elevation={outerElevation}
          indexToFocus={this.state.indexToFocus}
          data={data}
        />
        {React.Children.map(
          children,
          child =>
            child && React.cloneElement(child, { focus: this.focus, data }),
        )}
      </View>
    );
  }
}
