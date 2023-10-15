// App.js
import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./Map2";
import LoginScreen from "./Login";
import SignUpScreen from "./SingUp";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="PinTown"
          options={{ headerShown: false }}
        >
          {() => <MapScreen />}
        </Tab.Screen>
        <Tab.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: '로그인 페이지' }}
        />
        <Tab.Screen 
          name="SignUp" 
          component={SignUpScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

