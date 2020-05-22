import React from 'react';
import { View, Animated, Easing } from 'react-native';
import PieChart from './PieChart';

const AnimatedPie = Animated.createAnimatedComponent(PieChart);

export default class PieWrapper extends React.PureComponent {
  state = {
    endAngle: new Animated.Value(0),
    outerElevation: new Animated.Value(0),
    indexToFocus: null,
  };

  reset = () =>
    new Promise(resolve => {
      Animated.timing(this.state.endAngle, {
        toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver:false,
      }).start(() => resolve());
    });

  animate = () =>
    new Promise(resolve => {
      Animated.timing(this.state.endAngle, {
        toValue: 2,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver:false,
      }).start(() => resolve());
    });

  focus = indexToFocus => {
    Animated.timing(this.state.outerElevation, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver:false,
    }).start(() => {
      this.setState({ indexToFocus });
      Animated.timing(this.state.outerElevation, {
        toValue: 10,
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver:false,
      }).start();
    });
  };

  render() {
    const {
      data,
      innerRadius,
      outerRadius,
      padAngle,
      pieStyle,
      containerStyle,
      children,
      startAngle,
      valueAccessor,
      sort,
      animate,
    } = this.props;
    const { outerElevation, indexToFocus, endAngle } = this.state;

    const animEndAngle = endAngle ? Animated.multiply(endAngle, Math.PI) : 0;

    return (
      <View style={containerStyle}>
        <AnimatedPie
          pieStyle={pieStyle}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          startAngle={startAngle}
          endAngle={animEndAngle}
          padAngle={padAngle}
          valueAccessor={valueAccessor}
          sort={sort}
          animate={animate}
          elevation={outerElevation}
          indexToFocus={indexToFocus}
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
