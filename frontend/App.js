import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { BlurView } from '@react-native-community/blur';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const uploadFile = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      const response = await axios.post('https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      Alert.alert('Success', 'File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'An error occurred while uploading the file.');
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const response = await axios.get('https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev', {
        params: { fileName },
      });

      const { downloadUrl } = response.data;
      console.log('Download URL:', downloadUrl);

      Alert.alert('Download Success', `File available at:\n${downloadUrl}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'An error occurred while fetching the file.');
    }
  };

  return (
    <ImageBackground source={require('./assets/files1.jpg')} style={styles.backgroundImage}>
      <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cloud File Drive</Text>
        </View>
        <Animated.View style={{ ...styles.buttonContainer, opacity: fadeAnim }}>
          <TouchableOpacity style={styles.button} onPress={pickFile}>
            <Text style={styles.buttonText}>Pick a File</Text>
          </TouchableOpacity>
          {file && (
            <View style={styles.fileInfo}>
              <Text>File Name: {file.name}</Text>
              <Text>File Type: {file.type}</Text>
              <Text>File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={uploadFile} disabled={isUploading}>
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>
          {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
          <TouchableOpacity style={styles.button} onPress={() => downloadFile(file?.name)} disabled={!file}>
            <Text style={styles.buttonText}>Download File</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Screen</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Arial', // You can replace it with a custom font if required
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#4285F4', // Google Drive blue color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded edges
    marginVertical: 10, // Space between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  fileIcon: {
    marginRight: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f1f3f4', // Light gray background for header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#34A853', // Google Drive green color
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileInfo: {
    marginVertical: 20,
  },
});