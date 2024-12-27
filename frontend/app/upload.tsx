import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import LoadingIndicator from '@/components/Loading';

export default function UploadScreen() {
  const [loading, setLoading] = useState(false);
  const imageAnim = useRef(new Animated.Value(500)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const uploadToS3 = async (file: DocumentPicker.DocumentPickerAsset) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType || 'application/octet-stream',
        name: file.name,
      } as any);
  
      // Construct URL with fileName as query parameter
      const apiUrl = `https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev2/files?fileName=${encodeURIComponent(file.name)}`;
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
  
      const result = await response.json();
      console.log('Upload successful:', result);
      return result;
    } catch (error) {
      console.log('Upload error:', error);
      throw error;
    }
  };
  
  const handlePress = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true
      });
  
      if (!result.canceled) {
        const file = result.assets[0];
        console.log('Selected file:', file.uri);
        const uploadResult = await uploadToS3(file);
        console.log('Upload completed:', uploadResult);
      }
    } catch (error) {
      console.log('Document picking error:', error);
    } finally {
      setLoading(false);
    }
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
