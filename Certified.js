// Certified.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const CertifiedScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginButtonPress = () => {
    // 로그인 로직을 구현하세요.
    // 여기에서 username과 password를 사용하여 로그인을 시도할 수 있습니다.
    navigation.navigate('Home');
  };

  const handleSignUpButtonPress = () => {
    //회원가입 화면으로 이동
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text>Login 화면</Text>
      {/* 아이디 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {/* 비밀번호 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true} // 비밀번호 마스킹
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginButtonPress}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

       {/* 회원가입 버튼 */}
       <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignUpButtonPress}
      >
        <Text style={styles.signupButtonText}>회원 가입</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    loginButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    loginButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    signupButton: {
      marginTop: 10,
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    signupButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
export default CertifiedScreen;