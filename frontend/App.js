import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen</Text>
      <Button title="Go to Test Screen" onPress={() => navigation.navigate('Test')} />
    </View>
  );
}

function TestScreen() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
        copyToCacheDirectory: true,
      });

      if (result.type === 'cancel') {
        Alert.alert('Cancelled', 'No file selected.');
      } else {
        setFile(result);
        console.log('Selected file:', result);
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'An error occurred while picking a file.');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      Alert.alert('No File Selected', 'Please select a file to upload.');
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Request pre-signed URL from your backend (Simulate API Gateway URL)
      const response = await axios.get('https://your-api-gateway-url/upload-url', {
        params: {
          fileName: file.name,
          fileType: file.mimeType,
        },
      });

      const { uploadUrl } = response.data;

      // Step 2: Upload file to the pre-signed URL
      const fileBlob = await fetch(file.uri).then((res) => res.blob());

      await axios.put(uploadUrl, fileBlob, {
        headers: {
          'Content-Type': file.mimeType,
        },
      });

      Alert.alert('Success', 'File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'An error occurred while uploading the file.');
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      // Request pre-signed URL from backend for download
      const response = await axios.get('https://your-api-gateway-url/download-url', {
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
    <View style={styles.container}>
      <Text style={styles.title}>File Upload Screen</Text>
      <Button title="Pick a File" onPress={pickFile} />
      {file && (
        <View style={styles.fileInfo}>
          <Text>File Name: {file.name}</Text>
          <Text>File Type: {file.mimeType}</Text>
          <Text>File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</Text>
        </View>
      )}
      <Button title="Upload File" onPress={uploadFile} disabled={isUploading} />
      {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
      <Button title="Download File" onPress={() => downloadFile(file?.name)} disabled={!file} />
    </View>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
});
