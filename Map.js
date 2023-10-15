// Map.js google mpa 로드 기능

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [errorMsg] = useState(null);
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

      if (location) {
        const { latitude, longitude } = location.coords;

        // Google Geocoding API를 사용하여 역 이름 가져오기
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA7tr2yLcJ22AETMq5CovtLZ5RNjyajoM4`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results[0] && data.results[0].formatted_address) {
            const stationName = data.results[0].formatted_address;
            setLocationName(stationName);
          } else {
            setLocationName("역 이름을 찾을 수 없음");
          }
        } else {
          setLocationName("역 이름을 찾을 수 없음");
        }
      }
    })();
  }, []);

  const handleGPSButtonClick = () => {
    if (location) {
      moveCamera(location.coords.latitude, location.coords.longitude);
    }
  };

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
            radius={50}
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
  
      {/* 추가: 현재 위치 표시 */}
      <Text style={styles.currentLocationText}>
        {locationName ? `${locationName}` : "로딩 중..."}
      </Text>
  
      <TouchableOpacity
        style={styles.gpsButton}
        onPress={handleGPSButtonClick}
      >
        <Text style={styles.gpsButtonText}>GPS</Text>
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

  locationText: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    zIndex: 2,
  },

  currentLocationText: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    zIndex: 2,
  },
});


export default MapScreen;