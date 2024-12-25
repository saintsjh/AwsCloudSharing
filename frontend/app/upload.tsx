import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import LoadingIndicator from '@/components/Loading';

export default function UploadScreen() {
  const [loading, setLoading] = useState(false);
  const imageAnim = useRef(new Animated.Value(500)).current; // Start position off-screen
  const textAnim = useRef(new Animated.Value(0)).current; // Start position for text
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start opacity at 0

  useEffect(() => {
    Animated.timing(imageAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [imageAnim, fadeAnim]);

  const handlePress = async () => {
    setLoading(true);
    // Handle image button press
    console.log('Image button pressed');
    // Use the document picker to select a file
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      console.log('Selected file:', result.uri);
      // Handle the selected file
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('@/assets/images/shelf.jpg')} 
        style={[styles.backgroundImage, { opacity: fadeAnim }]}
      />
      <BlurView intensity={50} style={StyleSheet.absoluteFill}>
        <View style={styles.contentContainer}>
          <Animated.View style={{ transform: [{ translateY: textAnim }] }}>
            <ThemedText type="title" style={styles.titleText}>Upload a File</ThemedText>
          </Animated.View>
          <TouchableOpacity onPress={handlePress}>
            <Animated.Image
              source={require('@/assets/images/uploadIcon.png')} 
              style={[styles.image, { transform: [{ translateY: imageAnim }] }, styles.glow]}
            />
          </TouchableOpacity>
        </View>
      </BlurView>
      {loading && <LoadingIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: '#ffffff', 
    textShadowColor: '#000', 
    textShadowOffset: { width: 0, height: 2 }, 
    textShadowRadius: 3, 
    fontSize: 30,
    marginBottom: 20, 
  },
  image: {
    width: 100,
    height: 100,
  },
  glow: {
    shadowColor: '#ffffff', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 1, 
    shadowRadius: 10, 
  },
});