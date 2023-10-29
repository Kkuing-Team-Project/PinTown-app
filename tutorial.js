// tutorial.js

import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Import Image
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tutorial = () => {
  const navigation = useNavigation();

  const startButton = () => {
    navigation.navigate('Location');
  };

  const loginButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Image source={require('./assets/log/Main.png')} style={styles.image} />
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text style={styles.Title_text}>핀포인트를 통한 타운 커뮤니티</Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text style={styles.Title_text_2}>지도상의 핀포인트로 지역 정보 공유</Text>
      <Text style={styles.Title_text_2}>지금 핀타운을 시작해보세요!</Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <TouchableOpacity style={styles.startnButton} onPress={startButton}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loginButton}>
        <Text></Text>
        <Text style={styles.swtext}>이미 계정이 있나요? <Text style={styles.signupButtonText}> 로그인 </Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 44,
    padding: 8,
  },
  Title_text: {
    color: 'black',
    fontSize: 30,
  },
  Title_text_2: {
    color: 'black',
    fontSize: 20,
  },
  startnButton: {
    backgroundColor: '#60D937',
    padding: 10,
    height: 50,
    width: 250,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  signupButtonText: {
    color: '#60D937',
    fontSize: 20,
  },
  swtext: {
    color: '#828282',
    fontSize: 20,
  },
  image: {
    width: 180,
    height: 300,
  },
});

export default Tutorial;
