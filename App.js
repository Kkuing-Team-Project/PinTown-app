// App.js
import React from "react";
import { View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from "./Map";
import LoginScreen from "./Login";
import SignUpScreen from "./SingUp";

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PinTown">

        <Stack.Screen 
            name="PinTown" 
            component={MapScreen} 
            options={{ title: 'PinTown' }}
        />
        
        <Stack.Screen 
           name="Login" 
           component={LoginScreen} 
           options={{ title: '로그인 페이지' }}
        />

        <Stack.Screen 
           name="SignUp" 
           component={SignUpScreen} 
           options={{ title: '회원가입 페이지' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
