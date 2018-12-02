import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native';

export default function MyLabels({ data, focus }) {
  return (
    <View style={styles.container}>
      {data.map((arc, index) => (
        <TouchableNativeFeedback onPress={() => focus(index)}>
          <Text>{arc.title}</Text>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
});
