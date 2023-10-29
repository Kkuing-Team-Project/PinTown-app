// App.js

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapScreen from "./Map2";
//mport LoginScreen from "./Login";
//import SignupScreen from "./SignUp";
import ProfileScreen from "./profile";
import Tutorial from "./tutorial";
import Location from "./location";
import CertifiedScreen from './Certified';
import CertifiedScreen2 from './Certified2';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      >
        {() => <MapScreen />}
      </Tab.Screen>

    <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
      >
        {() => <ProfileScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  StatusBar.setBarStyle('dark-content');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tutorial" component={Tutorial} options={{headerShown: false}}/>
        <Stack.Screen name="Number2" component={CertifiedScreen2} options={{ headerShown: false }} /> 
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
        <Stack.Screen name="Number" component={CertifiedScreen} options={{ headerShown: false }} />        
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//<Stack.Screen name="Location" component={Location} options={{ headerTitle: '' }} />