# Serverless File Sharing App

This project is a serverless file-sharing application built using **React Native** and **AWS services**, including **Lambda**, **API Gateway**, and **S3 bucket**. The app allows users to upload files from their devices and share them securely via the cloud.

---

## Features

- **File Upload:** Users can select files from their device and upload them to an S3 bucket.
- **Serverless Architecture:** The app leverages AWS Lambda for backend logic, API Gateway for routing, and S3 for file storage.
- **Secure File Sharing:** Ensures secure file handling and storage using AWS's robust security features.
- **Cross-Platform:** Built with React Native to run on both Android and iOS devices.

---

## Prerequisites

1. **AWS Account**: Set up an AWS account to access AWS services.
2. **React Native Environment**: Ensure your development environment is configured for React Native.
   - Node.js
   - npm or yarn
   - Expo CLI
3. **AWS CLI**: Install the AWS Command Line Interface and configure it with your credentials.
   ```bash
   aws configure
   ```



## Running the Project

1. **Start the Development Server**:
   ```bash
   expo start
   ```
2. **Preview the App**:
   - Scan the QR code using Expo Go on your device.
   - Use an Android Emulator or iOS Simulator for testing.

---


## Future Enhancements

- Add user authentication using AWS Cognito.
- Implement file download functionality.
- Integrate real-time notifications for file uploads using AWS SNS.

---



