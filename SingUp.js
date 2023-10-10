import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSignup = () => {
    // 회원가입 로직을 구현하세요.
    // 여기에서 username, password, email 등을 사용하여 회원가입을 처리할 수 있습니다.

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>회원가입 화면</Text>
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

      {/* 이메일 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
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

export default SignupScreen;
