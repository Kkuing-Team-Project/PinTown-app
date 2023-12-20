import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const mapRef = useRef(null);
    const navigation = useNavigation();

    const db = SQLite.openDatabase("locations.db");


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setLocationName("권한 거부됨");
                return;
            }

            // 먼저 로컬 DB에서 위치 정보를 가져와서 표시
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM locations",
                    [],
                    (_, { rows: { _array } }) => {
                        if (_array.length > 0) {
                            const lastLocation = _array[_array.length - 1];
                            setLocation(lastLocation);
                            setLocationName(lastLocation.district || "동네 정보 없음");
                        }
                    }
                );
            });

            try {
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                const locationInfo = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (locationInfo && locationInfo.length > 0) {
                    const firstLocation = locationInfo[0];
                    const district = firstLocation.district || "동네 정보 없음";
                    setLocationName(district);

                    // 로컬 DB에 위치 정보 저장
                    db.transaction((tx) => {
                        tx.executeSql(
                            "INSERT INTO locations (latitude, longitude, district) VALUES (?, ?, ?)",
                            [location.coords.latitude, location.coords.longitude, district]
                        );
                    });
                } else {
                    setLocationName("동네 정보 없음");
                }
            } catch (error) {
                console.error("Error fetching location information:", error);
                setLocationName("로딩 오류");
            }
        })();
    }, []);

    const handleGPSButtonClick = () => {
        refreshLocation()
        if (location) {
            moveCamera(location.coords.latitude, location.coords.longitude);
        }
    };

    const navigateToBulletinBoard = () => {
        navigation.navigate("Write"); // Replace "BulletinBoard" with the actual name of your bulletin board screen
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

    const refreshLocation = async () => {
        try {
            console.log("restart");
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const locationInfo = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (locationInfo && locationInfo.length > 0) {
                const firstLocation = locationInfo[0];
                const district = firstLocation.district || "동네 정보 없음";
                setLocationName(district);

                // 로컬 DB에 위치 정보 업데이트
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE locations SET latitude = ?, longitude = ?, district = ? WHERE rowid = (SELECT max(rowid) FROM locations)",
                        [location.coords.latitude, location.coords.longitude, district]
                    );
                });
            } else {
                setLocationName("동네 정보 없음");
            }
        } catch (error) {
            console.error("Error fetching location information:", error);
            setLocationName("로딩 오류");
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
                        {/* <Image
                            source={require("./Image/user_UI.png")}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        /> */}
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

            <TouchableOpacity
                style={styles.bulletinBoardButton}
                onPress={navigateToBulletinBoard}
            >
                <Text style={styles.bulletinBoardButtonText}>+ 글 작성하기</Text>
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

    refreshButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    refreshButtonText: {
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

    bulletinBoardButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: "#60D937",
        padding: 10,
        borderRadius: 5,
    },
    bulletinBoardButtonText: {
        color: "black",
        fontWeight: "bold",
    },
});

export default MapScreen;
