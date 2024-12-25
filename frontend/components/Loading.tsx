import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});

export default LoadingIndicator;