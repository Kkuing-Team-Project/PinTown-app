import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import MapScreen from "./Map2";
import LoginScreen from "./Login";
import SignupScreen from "./SignUp";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {() => <MapScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Login"
        options={{ headerShown: false }}
      >
        {() => <LoginScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Home" component={MapScreen} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
