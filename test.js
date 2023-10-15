import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./Map2";
import LoginScreen from "./Login";
import SignupScreen from "./SignUp";
import ProfileScreen from "./profile";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
      >
        {() => <ProfileScreen />}
      </Stack.Screen>

      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
      >
        {() => <SignupScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MapScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Main" component={HomeStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
