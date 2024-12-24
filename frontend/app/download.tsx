import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function DownloadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Download Screen</Text>
      {/* Add your download functionality here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});