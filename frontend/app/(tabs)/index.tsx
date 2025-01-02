import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Link } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const welcomeAnim = useRef(new Animated.Value(-50)).current;
  const toAnim = useRef(new Animated.Value(-50)).current;
  const cloudAnim = useRef(new Animated.Value(-50)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, [welcomeAnim, toAnim, cloudAnim, fadeAnim]);

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
          <Animated.View style={{ 
            transform: [{ translateY: welcomeAnim }],
            opacity: fadeAnim 
          }}>
            <ThemedText type="title" style={[styles.titleText, styles.h1Text]}>Welcome</ThemedText>
          </Animated.View>
          <Animated.View style={{ 
            transform: [{ translateY: toAnim }],
            opacity: fadeAnim 
          }}>
            <ThemedText type="title" style={[styles.titleText, styles.h2Text]}>to</ThemedText>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: cloudAnim }] }}>
            <ThemedText type="title" style={styles.titleText}>Cloud File Sharing</ThemedText>
          </Animated.View>
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
    marginTop: 250,
    backgroundColor: 'transparent',
  },
  titleText: {
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 10,
  },
  h1Text: {
    fontSize: 30,
  },
  h2Text: {
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
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
    shadowOpacity: 0.60, // Shadow opacity
    shadowRadius: 5.84, // Shadow radius
    elevation: 5, // Required for Android to show shadow
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
  },
});
