import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { IconButton, MD3Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data'
import axios from 'axios';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const ProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [username, setUsername] = React.useState('');

  const [imageUrl, setImageUrl] = useState('');
  // 권한 요청을 위한 hooks
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const leftButtton = () => {
    //Home으로 이동
    navigation.navigate('Number');
  };

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
  
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1]
    });

    if (result.cancelled) {
      return null; // 이미지 업로드 취소한 경우
    }
  
    setImageUrl(result.assets[0].uri); // 이미지 업로드 결과 및 이미지 경로 업데이트
  
    // 서버에 요청 보내기
    const localUri = result.assets[0].uri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('image', { uri: localUri, name: filename, type });

    try {
      const response = await axios.post('http://192.168.0.89:8081/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle a successful response (e.g., check the status code and response data)
      if (response.status === 200) {
        console.log('Request was successful');
        console.log('Response data:', response.data);
        // You can update your UI or perform further actions based on the response.
        alert('이미지 업로드 성공');
      } else {
        console.error('Request was not successful. Status code:', response.status);
        // Handle the error (e.g., show an error message to the user)
        alert('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('Axios request error:', error);
      // Handle the error (e.g., show an error message to the user)
      alert('이미지 업로드 중 오류 발생');
    }
  };
  

  // start 버튼 | 53번 줄
  const ClikButton = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
        </View>
        <View style={styles.circularShape}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <IconButton icon='camera' iconColor={MD3Colors.error50} size={60} onPress={uploadImage} />
          )}
        </View>

         
        <Text style={styles.title_txt}>닉네임</Text>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력해주세요."
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
    
        <TouchableOpacity style={styles.signupButton} onPress={ClikButton}>
          <Text style={styles.signupButtonText}>시작하기</Text>
        </TouchableOpacity>
    </View>
  );
};


const imageWidth = 290; // 이미지 너비
const imageHeight = 290; // 이미지 높이
const borderRadius = Math.min(imageWidth, imageHeight) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 배경색 설정
  },

  image: {
    width: imageWidth, // 이미지 너비 조절
    height: imageHeight, // 이미지 높이 조절
    borderRadius: borderRadius, // 이미지를 원 모양으로 만듭니다. (원의 반지름은 너비와 높이의 절반)
  },

  title_txt:{
      //justifyContent: 'center',
      top:-90,
      color: 'black',
      fontSize: 25,
      padding: 30,
  },

  input: {
      alignSelf: 'center', // 가로 중앙으로 배치
      justifyContent: 'center', // 세로 중앙으로 배치
      width: '90%',
      height: '7%',
      top:-100,
      borderWidth: 1,
      borderColor: 'black',
      padding:15,
      marginBottom: 10,
      borderRadius: 10,
      fontSize: 20,
  },

  signupButton: {
      alignSelf: 'center', // 가로 중앙으로 배치
      justifyContent: 'center', // 세로 중앙으로 배치
      marginTop: 10,
      top:-80,
      backgroundColor:  '#60D937',
      padding: 10,
      width: '90%',
      height: '7%',
      borderRadius: 10,
  },
  
  signupButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:20,
  },

  header: {
      height:170,
      justifyContent: 'center',
      verticalAlign:'auto',
      padding:20,
  },

  Top:{
    top:-40,
    alignSelf: 'center', // 가로 중앙으로 배치
    justifyContent: 'center', // 세로 중앙으로 배치
    width: 300,  // Adjust the width and height as needed
    height: 300, // These should be equal to make it a circle
    borderRadius: 150, // Half of the width/height to create a circle
    backgroundColor: '#FFFFFF', // Add your desired background color
    alignItems: 'center',

  },

  circularShape: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //position:'absolute',
    top:-70,
    width: 300,  // Adjust the size as needed
    height: 300, // These should be equal to make it a circle
    borderRadius: 150, // Half of the width/height to create a circle
    borderWidth: 5, // You can add a border width
    borderColor: '#60D937', // Border color
    backgroundColor: 'transparent', // Background color
  },
});

export default ProfileScreen;
