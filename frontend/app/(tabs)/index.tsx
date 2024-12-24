import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const welcomeAnim = useRef(new Animated.Value(-50)).current;
  const toAnim = useRef(new Animated.Value(-50)).current;
  const cloudAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(welcomeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(toAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(cloudAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [welcomeAnim, toAnim, cloudAnim]);

  return (
    <View style={styles.container}>
      <Video
        source={require('@/assets/videos/files.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />
      <BlurView intensity={25} style={StyleSheet.absoluteFill}>
        <ThemedView style={styles.titleContainer}>
          <Animated.View style={{ transform: [{ translateY: welcomeAnim }] }}>
            <ThemedText type="title" style={[styles.titleText, styles.h1Text]}>Welcome</ThemedText>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: toAnim }] }}>
            <ThemedText type="title" style={[styles.titleText, styles.h2Text]}>to</ThemedText>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: cloudAnim }] }}>
            <ThemedText type="title" style={styles.titleText}>Cloud File Sharing</ThemedText>
          </Animated.View>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <Link href="/upload" style={styles.button}>
            <ThemedText type="link" style={styles.buttonText}>Upload</ThemedText>
          </Link>
          <Link href="/download" style={styles.button}>
            <ThemedText type="link" style={styles.buttonText}>Download</ThemedText>
          </Link>
        </ThemedView>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250, // Adjust this value to move the text lower on the screen
    backgroundColor: 'transparent', // Ensure transparency
  },
  titleText: {
    textAlign: 'center',
    color: '#ffffff', // Ensure the text is visible
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 3, // Shadow radius
    marginBottom: 10, // Add vertical spacing between text elements
  },
  h1Text: {
    fontSize: 30, 
  },
  h2Text: {
    fontSize: 18, // Adjust this value to make the text size smaller
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent', // Ensure transparency
  },
  button: {
    padding: 10,
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
    marginVertical: 10, // Add vertical margin to separate the buttons
    width: '60%', // Adjust the width of the buttons
    alignItems: 'center', // Center the text inside the button
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Required for Android to show shadow
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff', // Ensure the text is white for better visibility
  },
});