import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur/src';
import { ThemedText } from '../components/ThemedText';
import LoadingIndicator from '../components/Loading';

interface FileItem {
  name: string;
  size: number;
  lastModified: string;
}

export default function DownloadScreen() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showFileList, setShowFileList] = useState(false);
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

  const getMockFiles = (): FileItem[] => {
    return [
      {
        name: "presentation.pdf",
        size: 2048576,
        lastModified: new Date().toISOString()
      },
      {
        name: "vacation-photos.zip",
        size: 15728640,
        lastModified: new Date().toISOString()
      },
      {
        name: "project-report.docx",
        size: 1048576,
        lastModified: new Date().toISOString()
      },
      {
        name: "budget2024.xlsx",
        size: 524288,
        lastModified: new Date().toISOString()
      },
      {
        name: "meeting-notes.txt",
        size: 102400,
        lastModified: new Date().toISOString()
      },
      {
        name: "company-logo.png",
        size: 3145728,
        lastModified: new Date().toISOString()
      },
      {
        name: "client-database.sql",
        size: 8388608,
        lastModified: new Date().toISOString()
      },
      {
        name: "marketing-video.mp4",
        size: 104857600,
        lastModified: new Date().toISOString()
      },
      {
        name: "source-code.zip",
        size: 5242880,
        lastModified: new Date().toISOString()
      },
      {
        name: "employee-handbook.pdf",
        size: 4194304,
        lastModified: new Date().toISOString()
      },
      {
        name: "product-designs.ai",
        size: 12582912,
        lastModified: new Date().toISOString()
      },
      {
        name: "customer-feedback.csv",
        size: 786432,
        lastModified: new Date().toISOString()
      },
      {
        name: "system-backup.tar",
        size: 20971520,
        lastModified: new Date().toISOString()
      },
      {
        name: "annual-report.key",
        size: 9437184,
        lastModified: new Date().toISOString()
      },
      {
        name: "training-materials.pptx",
        size: 6291456,
        lastModified: new Date().toISOString()
      }
    ];
  };
    
  // const fetchList = async() =>{
  //   try{
  //     const response = await fetch('https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev2/files');
  //     const data = await response.json();
  //     setFiles(data.files || []);
  //     console.log('Files fetched:', data.files);
  //   }
  //   catch(error){
  //     console.log("Error: ",error);
  //   }
  // };
  const fetchList = async() => {
    try {
      // Comment out the actual API call for testing
      // const response = await fetch('https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev2/files');
      // const data = await response.json();
      // setFiles(data.files || []);
      
      // Use mock data instead
      const mockFiles = getMockFiles();
      setFiles(mockFiles);
      console.log('Files fetched:', mockFiles);
    } catch(error) {
      console.log("Error: ",error);
    }
  };
  

  const downloadFromS3 = async (fileName: string) => {
    try {
      const apiUrl = `https://08v3ztryn3.execute-api.us-east-1.amazonaws.com/dev2/files/${encodeURIComponent(fileName)}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const result = await response.json();
      console.log('Download successful:', result);
      return result;
    } catch (error) {
      console.log('Download error:', error);
      throw error;
    }
  };

  const handlePress = async() => {
   setShowFileList(true);
   fetchList();
  };

  const downloadFile = async(fileName : string) =>{
    setLoading(true);
    try{
      const result = await downloadFromS3(fileName);
      console.log("downloaded: ", result);
    }
    catch(error){
      console.log("Error: ", error);
    }
    finally{
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
          {!showFileList ? (
            <>
              <Animated.View style={{ transform: [{ translateY: textAnim }] }}>
                <ThemedText type="title" style={styles.titleText}>Download Files</ThemedText>
              </Animated.View>
              <TouchableOpacity onPress={handlePress}>
                <Animated.Image
                  source={require('@/assets/images/download-download-icon-free-png.webp')}
                  style={[styles.image, { transform: [{ translateY: imageAnim }] }, styles.glow]}
                />
              </TouchableOpacity>
            </>
          ) : (
            <ScrollView style={styles.fileList}>
              {files.map((file, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.fileButton}
                  onPress={() => downloadFile(file.name)}
                >
                  <ThemedText style={styles.fileButtonText}>{file.name}</ThemedText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowFileList(false)}
              >
                <ThemedText style={styles.backButtonText}>Back</ThemedText>
              </TouchableOpacity>
            </ScrollView>
          )}
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
  fileList: {
    width: '80%',
    maxHeight: '70%',
    padding: 20,
  },
  fileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  backButtonText: {
    textAlign: 'center',
    color: '#ffffff',
  },
});