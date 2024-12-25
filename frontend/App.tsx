import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/(tabs)/index';
import UploadScreen from './app/upload';
import DownloadScreen from './app/download';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Download" component={DownloadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}