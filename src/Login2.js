import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
// import userData from './userData.json'; // JSON 파일에서 사용자 데이터 불러오기

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태

  const handleLoginButtonPress = () => {
    // JSON 파일에서 사용자 데이터 가져오기
    // const users = userData.users;

    // 사용자가 입력한 아이디와 비밀번호
    // const enteredUsername = username;
    // const enteredPassword = password;

    // // 사용자 데이터에서 일치하는 사용자 찾기
    // const user = users.find((user) => user.username === enteredUsername && user.password === enteredPassword);

    if (username != null) {
      // 로그인 성공: 다음 화면으로 이동
      console.log('로그인 성공');
      navigation.navigate('PinTown');
    } else {
      // 로그인 실패: 에러 메시지 출력 또는 다른 조치를 취할 수 있음
      console.log('로그인 실패');
    }
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
};

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

export default LoginScreen;
