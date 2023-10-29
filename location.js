// location.js

import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, IconButton, MD3Colors } from 'react-native-paper';
import { ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();

const LocationScreen = () => {
  const navigation = useNavigation();

  const loginButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
        <Text>근처 동네</Text>
        <TouchableOpacity style={styles.findnButton} onPress={loginButton}>
          <Text style={styles.findnButtonText}>현재위치로 찾기</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bottomUIContainer}>
                <Text style={styles.Text_title}>내 동네 확인을 위해 정확한 위치로 시작</Text>
                <TouchableOpacity style={styles.findnButton_2} onPress={loginButton}>
                    <Text style={styles.findnButtonText_2}>시작하기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signupButton} onPress={loginButton}>
                  <Text style={styles.signupButtonText}>취소</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    </View>
  );
};

const Location = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const leftButtton = () => {
    navigation.navigate('Tutorial');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ 
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
        ),
        headerTitle: () => (
          <View>
            <Searchbar style={styles.searchbar}
              placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
              onChangeText={setSearchQuery}
              value={searchQuery}
              searchIcon={false}
            />
          </View>
        ),
      }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'center',
    // paddingTop: 20,
    // padding: 10,
    backgroundColor: '#E9E9EA',
  },

  bottomUIContainer: {
    position: 'absolute', // 절대 위치 설정
    bottom: 0, // 아이폰 하단에 고정
    width: '100%', // 가로 전체 너비
    height: '50%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 배경색 설정
    borderRadius: 30,
  },

  findnButton_2: {
    position: 'absolute', // 절대 위치 설정
    bottom: 60, // 아이폰 하단에 고정
    alignItems: 'center',
    backgroundColor: '#60D937',
    padding: 9,
    height: 50,
    width: 250,
    borderRadius: 10,
    marginBottom: 10, // Add margin to separate UI components
  },

  findnButtonText_2: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },

  Text_title: {
    position: 'absolute', // 절대 위치 설정
    bottom:170,
    color: '#000000',
    fontSize: 28,
    textAlign: 'center',
  },

  signupButton:{
    position: 'absolute', // 절대 위치 설정
    bottom: 5, // 아이폰 하단에 고정
    alignItems: 'center',
    backgroundColor: '#FFFF',
    padding: 9,
    height: 50,
    width: 120,
    borderRadius: 10,
    marginBottom: 10, // Add margin to separate UI components
  },

  signupButtonText:{
    textAlign: 'center',
    color: '#828282',
    fontSize: 25,
  },

  findnButton: {
    alignItems: 'center',
    backgroundColor: '#60D937',
    padding: 9,
    height: 45,
    width: 350,
    borderRadius: 10,
    marginBottom: 10, // Add margin to separate UI components
  },

  findnButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  searchbar: {
    backgroundColor: '#E9E9EA',
    height: 40,
    width: 300,
    borderRadius: 10,
  },
});

export default Location;
