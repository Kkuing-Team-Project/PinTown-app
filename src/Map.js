import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'locations.db', createFromLocation: 1 });

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, district TEXT);'
      );
    });

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        moveCamera(latitude, longitude);
        updateLocationInfo(latitude, longitude);
        saveLocationToDB(latitude, longitude);
      },
      error => {
        console.error("Error fetching location information:", error);
        setLocationName("로딩 오류");
      }
    );
  }, []);

  const updateLocationInfo = async (latitude, longitude) => {
    Geolocation.setRNConfiguration({ skipPermissionRequests: true, authorizationLevel: 'always' });
    Geolocation.getCurrentPosition(
      async position => {
        const locationInfo = await Geolocation.reverseGeocode(position.coords);
        if (locationInfo && locationInfo.length > 0) {
          const firstLocation = locationInfo[0];
          const district = firstLocation.subregion || "동네 정보 없음";
          setLocationName(district);
        } else {
          setLocationName("동네 정보 없음");
        }
      },
      error => {
        console.error("Error fetching location information:", error);
        setLocationName("로딩 오류");
      }
    );
  };

  const saveLocationToDB = (latitude, longitude) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO locations (latitude, longitude, district) VALUES (?, ?, ?)",
        [latitude, longitude, locationName]
      );
    });
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

  const handleGPSButtonClick = () => {
    if (location) {
      moveCamera(location.latitude, location.longitude);
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
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={50}
            fillColor="rgba(0, 128, 255, 0.3)"
            strokeColor="rgba(0, 128, 255, 0.5)"
          />

          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
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

      <Text style={styles.currentLocationText}>
        {locationName ? `${locationName}` : "동네 정보 가져오는 중..."}
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
