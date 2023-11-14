// Certified.js

import React, { useState, } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Searchbar, IconButton, MD3Colors } from 'react-native-paper';

const CertifiedScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [clik, setClik] = useState(true)

  const leftButtton = () => {
    navigation.navigate('Location');
    console.log('ok');
  };

  const ClikButton = () => {
    setClik(false);
  };

  const NumberButton = () => {
    const getNumber = "01025143059"; // 테스트 용 번호 | phoneNumber 변수 입력 예정

    if (getNumber) {
        const data = {
            getNumber: getNumber
        };

        fetch('/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log('인증번호 발송');
    } else {
        console.error('전화번호가 입력되지 않았습니다.');
    }
};

  const CertifiedButton = () => {
    navigation.navigate('Profile');
  };

  if (clik == true){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
            </View>
            <Text style={styles.title_txt}>안녕하세요!                                               휴대폰 번호로 가입해주세요.</Text>
            <Text style={styles.text}>휴대폰 번호는 안전하게 보관되며 이웃들에게 제공되지 않아요.</Text>
    
            <TextInput
                style={styles.input}
                placeholder="휴대폰 번호(- 없이 숫자만 입력)"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
    
            <TouchableOpacity style={styles.signupButton} onPress={ClikButton}>
                <Text style={styles.signupButtonText}>인증 문자받기</Text>
            </TouchableOpacity>
        </View>
      );
  }
  else{
    return (
        <View style={styles2.container}>
            <View style={styles2.header}>
                <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
            </View>
            <TextInput
                // 전화번호 입력 코드
                style={styles2.input}
                placeholder="휴대폰 번호(- 없이 숫자만 입력)"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
    
            <TouchableOpacity style={styles2.signupButton} onPress={NumberButton}>
                <Text style={styles2.signupButtonText}>인증 문자받기</Text>
            </TouchableOpacity>
            
            <TextInput
                style={styles2.input2}
                placeholder="인증번호 입력"
                secureTextEntry={true} // 비밀번호 마스킹
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles2.text}>어떤 경우에도 타인에게 공유하지 마세요!</Text>
            <TouchableOpacity style={styles2.signupButton2} onPress={CertifiedButton}>
                <Text style={styles2.signupButtonText}>동의하고 시작하기</Text>
            </TouchableOpacity>
        </View>
      );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    title_txt:{
        //justifyContent: 'center',
        top:-90,
        color: 'black',
        fontSize: 30,
        padding: 30,
    },
    text:{
        top:-140,
        color: 'black',
        padding: 33,
    },

    input: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        width: '90%',
        height: '7%',
        top:-140,
        borderWidth: 1,
        borderColor: 'gray',
        padding:15,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 20,
    },

    signupButton: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        marginTop: 10,
        top:-140,
        backgroundColor:  '#4BAF4B',
        padding: 10,
        width: '90%',
        height: '7%',
        borderRadius: 5,
    },
    
    signupButtonText: {
      color: 'gray',
      fontWeight: 'bold',
      textAlign:'center',
    },

    header: {
        height:170,
        justifyContent: 'center',
        verticalAlign:'auto',
        padding:20,
    },
 });

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
    },

    text:{
        top:-70,
        color: 'black',
        padding: 33,
    },

    input: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        width: '90%',
        height: '7%',
        top:-60,
        borderWidth: 1,
        borderColor: 'gray',
        padding:15,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 20,
    },

    input2: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        width: '90%',
        height: '7%',
        top:-40,
        borderWidth: 1,
        borderColor: 'gray',
        padding:15,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 20,
    },

    signupButton: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        marginTop: 10,
        top:-60,
        backgroundColor:  '#60D937',
        padding: 10,
        width: '90%',
        height: '7%',
        borderRadius: 5,
    },

    signupButton2: {
        alignSelf: 'center', // 가로 중앙으로 배치
        justifyContent: 'center', // 세로 중앙으로 배치
        marginTop: 10,
        top:-100,
        backgroundColor:  '#60D937',
        padding: 10,
        width: '90%',
        height: '7%',
        borderRadius: 5,
    },
    
    signupButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize:19,
    },

    header: {
        height:170,
        justifyContent: 'center',
        verticalAlign:'auto',
        padding:20,
      },
  });


  
export default CertifiedScreen;