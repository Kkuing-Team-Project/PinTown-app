// Map.js

import React, { useState, useEffect, useRef} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // GPS 버튼을 눌렀을 때 현재 위치로 이동
  const handleGPSButtonClick = () => {
    if (location) {
      moveCamera(location.coords.latitude, location.coords.longitude);
    }
  };
  // Login 버튼을 눌렀을 때 Login 페이지로 이동 
  const handleLoginButtonClick = () => {
    console.log('Login 페이지 이동'); // 터미널에 출력
    navigation.navigate('Login');
  };

  // 카메라를 이동시킬 함수
  const moveCamera = (latitude, longitude) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Circle
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            radius={50} // Circle의 반지름을 작은 값으로 설정
            fillColor="rgba(0, 128, 255, 0.3)"
            strokeColor="rgba(0, 128, 255, 0.5)"
          />

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Image
              source={require("./Image/user_UI.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Marker>
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      {/* GPS 버튼 */}
      <TouchableOpacity
        style={styles.gpsButton}
        onPress={handleGPSButtonClick}
      >
        <Text style={styles.gpsButtonText}>GPS</Text>
      </TouchableOpacity>

     {/* Login 버튼 */}
     <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginButtonClick}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gpsButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  gpsButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  loginButton: {
    position: "absolute",
    bottom: 16,
    right: 80,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MapScreen;
