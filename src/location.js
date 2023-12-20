// location.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Ch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, IconButton, MD3Colors } from 'react-native-paper';
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { CheckBox } from 'react-native-elements'
import { WithLocalSvg } from 'react-native-svg';
import TestSvg from '../assets/log/pintown.svg';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollEnabled] = useState(false);
  const [showScrollView, setShowScrollView] = useState(true);
  const [sty, setSty] = useState(true);
  const [consent, setConsent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [local, localName] = useState(null);
  // const [loadingLocation, setLoadingLocation] = useState(true);

  const db = SQLite.openDatabase("locations.db");

  const Certified = () => {
    setShowScrollView(false);
    setSty(false);
  };

  const No_Certified = () => {
    console.log("아이폰 위치 권한 미 설정");
    setShowScrollView(false);
    setSty(false);
  };

  const leftButtton = () => {
    navigation.navigate("Tutorial");
  };

  const startButtons = () => {
    navigation.navigate("Number");
  };

  const localButton = () => {
    console.log(`${local} 위치 클릭 완료`);
    setConsent(true);
  };

  const check = () => {
    console.log("1단계 완료");
  };

  const refreshLocation = async () => {
    try {
      //setLoadingLocation(true);
      if (locationName == null){
        const test = "현재 위치 찾는 중"
        setLocationName(test);
      }
      console.log("현재 위치 찾는 중");
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  
      const locationInfo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (locationInfo && locationInfo.length > 0) {
        const firstLocation = locationInfo[0];
        const region = firstLocation.region || "수도 정보 없음";
        const city = firstLocation.city || "도시 정보 없음";
        const district = firstLocation.district || "동네 정보 없음";
        const info = region + " " + city + " " + district;
        console.log(info);
        setLocationName(info);
        localName(info);

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
    } finally {
      //setLoadingLocation(true);
    }
  };

  if (consent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
          <Searchbar
            style={styles.searchbar}
            placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            searchIcon={false}
          />
        </View>

        <TouchableOpacity style={styles.findnButton} onPress={refreshLocation}>
          <Text style={styles.findnButtonText}>현재위치로 찾기</Text>
        </TouchableOpacity>

        <Text>근처 동네</Text>
        <Text style={styles.localtext}>{locationName ? `${locationName}` : ""}</Text>
        <ScrollView contentContainerStyle={styles.container2}>
          <View style={styles.bottomUIContainer2}>
            <CheckBox
              center
              title=""
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={check}
            />
          <Text style={styles.checkboxText}>동의</Text>

            {/* Additional Checkboxes and Information */}
            <View style={styles.checkboxContainer}>
              <CheckBox
                center
                title=""
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={styles.checkboxText}>(필수) 핀타운 약관 및 동의사항</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                center
                title=""
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={styles.checkboxText}>(선택) 마케팅 정보 수신동의</Text>
            </View>
            <Text style={styles.minAgeText}>최소 연령 확인</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                center
                title=""
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
              <Text style={styles.checkboxText}>만 14세 이상이에요</Text>
            </View>

            <TouchableOpacity
              style={styles.findnButton_2}
              onPress={startButtons}
            >
              <Text style={styles.findnButtonText_2}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else if (sty) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
          <Searchbar
            style={styles.searchbar}
            placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            searchIcon={false}
          />
        </View>

        <TouchableOpacity style={styles.findnButton} onPress={refreshLocation}>
          <Text style={styles.findnButtonText}>현재위치로 찾기</Text>
        </TouchableOpacity>

        {showScrollView && (
          <ScrollView
            contentContainerStyle={styles.container2}
            scrollEnabled={scrollEnabled}
          >
            <View style={styles.bottomUIContainer}>
              <WithLocalSvg
                width={250}
                height={150}
                fill="#000000"
                asset={TestSvg}
              />
              <Text style={styles.Text_title}>
                내 동네 확인을 위해 정확한 위치로 시작
              </Text>
              <TouchableOpacity
                style={styles.findnButton_2}
                onPress={Certified}
              >
                <Text style={styles.findnButtonText_2}>시작하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={No_Certified}
              >
                <Text style={styles.signupButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container2}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
          <Searchbar
            style={styles.searchbar2}
            placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            searchIcon={false}
          />
        </View>

        <TouchableOpacity style={styles.findnButton2} onPress={refreshLocation}>
          <Text style={styles.findnButtonText2}>현재위치로 찾기</Text>
        </TouchableOpacity>

        <Text>근처 동네</Text>
        <TouchableOpacity onPress={localButton}>
          <Text style={styles.localtext}>
            {""}
            { locationName || ""}
          </Text>
        </TouchableOpacity>

        {showScrollView && (
          <ScrollView
            contentContainerStyle={styles.container2}
            scrollEnabled={scrollEnabled}
          >
            <View style={styles.bottomUIContainer}>
              <Text style={styles.Text_title}>
                내 동네 확인을 위해 정확한 위치로 시작
              </Text>
              <TouchableOpacity
                style={styles.findnButton_2}
                onPress={Certified}
              >
                <Text style={styles.findnButtonText_2}>시작하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={No_Certified}
              >
                <Text style={styles.signupButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  container2: {
    flex: 1,
  },

  bottomUIContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  bottomUIContainer2: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  findnButton_2: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    backgroundColor: "#60D937",
    padding: 9,
    height: 50,
    width: 250,
    borderRadius: 10,
    marginBottom: 10,
  },

  findnButtonText_2: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },

  Text_title: {
    position: "absolute",
    bottom: 150,
    color: "#000000",
    fontSize: 24,
    textAlign: "center",
  },

  signupButton: {
    position: "absolute",
    bottom: 5,
    alignItems: "center",
    backgroundColor: "#FFFF",
    padding: 9,
    height: 50,
    width: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  signupButtonText: {
    textAlign: "center",
    color: "#828282",
    fontSize: 25,
  },

  findnButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#rgba(54, 133, 44, 1)",
    padding: 9,
    height: 45,
    width: 350,
    borderRadius: 10,
  },

  findnButton2: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#60D937",
    padding: 9,
    height: 45,
    width: 350,
    borderRadius: 10,
  },

  findnButtonText: {
    color: "gray",
    fontSize: 20,
    textAlign: "center",
  },

  findnButtonText2: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },

  searchbar: {
    flex: 1,
    backgroundColor: "#rgba(255, 255, 255, 0.2)",
    height: 40,
    width: 350,
    borderRadius: 10,
  },

  searchbar2: {
    flex: 1,
    backgroundColor: "#E9E9EA",
    height: 40,
    width: 350,
    borderRadius: 10,
  },

  header: {
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  localtext: {
    color: "#60D937",
    fontSize: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  checkboxText: {
    marginLeft: 10,
  },

  minAgeText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default LocationScreen;
