// location.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Ch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, IconButton, MD3Colors } from 'react-native-paper';
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { CheckBox } from 'react-native-elements'

const LocationScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [scrollEnabled] = useState(false);
  const [showScrollView, setShowScrollView] = useState(true); // 추가
  const [sty, setSty] = useState(true);
  const [consent, setConsent] = useState(false);

  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const db = SQLite.openDatabase("locations.db");

  const Certified = () => {
    // 아이폰 위치 권한 설정
    
    setShowScrollView(false); // ScrollView를 숨김
    setSty(false);
  };

  const No_Certified = () => {
    // 아이폰 위치 권한 미설정
    console.log('아이폰 위치 권한 미 설정')
    setShowScrollView(false); // ScrollView를 숨김
    setSty(false);
  };

  const leftButtton = () => {
    // 이전 화면으로 돌아가기
    navigation.navigate('Tutorial');
  };

  const startButtons = () => {
    // 다음 화면으로 넘아가기
    navigation.navigate('Number');
  };

  const localButton = () => {
    console.log('위치 클릭 완료');
    setConsent(true);
  };

  const check = () => {
    console.log('1단계 완료');
  }

  const refreshLocation = async () => {
    try {
      console.log("현재 위치 찾는 중");
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location); // 경도 위도

      const locationInfo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (locationInfo && locationInfo.length > 0) {
        const firstLocation = locationInfo[0];
        const region = firstLocation.region || '수도 정보 없음';
        const city = firstLocation.city || '도시 정보 없음'
        const district = firstLocation.district || "동네 정보 없음";
        const info = region + ' ' + city + ' ' + district;
        console.log(info);
        setLocationName(info);

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

  if(consent == true){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
          <Searchbar
            style={styles.searchbar}
            placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            searchIcon={false}/>
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
                title='모두 동의'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={check}
              />
            <Text style={styles.Text_title}>동의</Text>
            <TouchableOpacity style={styles.findnButton_2} onPress={startButtons}>
              <Text style={styles.findnButtonText_2}>시작하기</Text>
            </TouchableOpacity>
  
          </View>
        </ScrollView>
      </View>
    );
  }

  else if (sty == true) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
          <Searchbar
            style={styles.searchbar}
            placeholder="동명(읍, 면)으로 검색 (ex 송파동)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            searchIcon={false}/>
        </View>
        
        <TouchableOpacity style={styles.findnButton} onPress={refreshLocation}>
            <Text style={styles.findnButtonText}>현재위치로 찾기</Text>
        </TouchableOpacity>

        {showScrollView && ( 
          <ScrollView contentContainerStyle={styles.container2} scrollEnabled={scrollEnabled}>
            <View style={styles.bottomUIContainer}>
              <Text style={styles.Text_title}>내 동네 확인을 위해 정확한 위치로 시작</Text>
              <TouchableOpacity style={styles.findnButton_2} onPress={Certified}>
                <Text style={styles.findnButtonText_2}>시작하기</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.signupButton} onPress={No_Certified}>
                <Text style={styles.signupButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
  else if (sty == false){
    //{locationName ? `${locationName}` : "동네 정보 가져오는 중..."}
    return (
      <View style={styles.container2}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton} />
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
          <Text style={styles.localtext}>{locationName ? `${locationName}` : ""}</Text>
        </TouchableOpacity>

        {showScrollView && ( 
          <ScrollView contentContainerStyle={styles.container2} scrollEnabled={scrollEnabled}>
            <View style={styles.bottomUIContainer}>
              <Text style={styles.Text_title}>내 동네 확인을 위해 정확한 위치로 시작</Text>
              <TouchableOpacity style={styles.findnButton_2} onPress={Certified}>
                <Text style={styles.findnButtonText_2}>시작하기</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.signupButton} onPress={No_Certified}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 불투명한 배경 설정
  },

  container2: {
    flex: 1,
    // backgroundColor: '#FFFFFF'
  },

  bottomUIContainer: {
    position: 'absolute', // 절대 위치 설정
    bottom: 0, // 아이폰 하단에 고정
    width: '100%', // 가로 전체 너비
    height: '50%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 배경색 설정
    borderRadius: 30,
  },
  bottomUIContainer2:{
    position: 'absolute', // 절대 위치 설정
    bottom: 0, // 아이폰 하단에 고정
    width: '100%', // 가로 전체 너비
    height: '75%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 배경색 설정
    borderRadius: 30,
  },

  findnButton_2: {
    position: 'absolute', // 절대 위치 설정
    bottom: 60, // 아이폰 하단에 고정
    alignItems: 'center',
    backgroundColor: '#60D937',
    padding: 9,
    height: 50,
    width: 250,
    borderRadius: 10,
    marginBottom: 10, // Add margin to separate UI components
  },

  findnButtonText_2: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },

  Text_title: {
    position: 'absolute', // 절대 위치 설정
    bottom:170,
    color: '#000000',
    fontSize: 28,
    textAlign: 'center',
  },

  signupButton:{
    position: 'absolute', // 절대 위치 설정
    bottom: 5, // 아이폰 하단에 고정
    alignItems: 'center',
    backgroundColor: '#FFFF',
    padding: 9,
    height: 50,
    width: 120,
    borderRadius: 10,
    marginBottom: 10, // Add margin to separate UI components
  },

  signupButtonText:{
    textAlign: 'center',
    color: '#828282',
    fontSize: 25,
  },

  findnButton: {
    alignSelf: 'center', // 가로 중앙으로 배치
    justifyContent: 'center', // 세로 중앙으로 배치
    backgroundColor:  '#rgba(54, 133, 44, 1)',
    padding: 9,
    height: 45,
    width: 350,
    borderRadius: 10,
  },

  findnButton2: {
    alignSelf: 'center', // 가로 중앙으로 배치
    justifyContent: 'center', // 세로 중앙으로 배치
    backgroundColor: '#60D937',
    padding: 9,
    height: 45,
    width: 350,
    borderRadius: 10,
  },

  findnButtonText: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
  },

  findnButtonText2: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  searchbar: {
    flex:1,
    backgroundColor: '#rgba(255, 255, 255, 0.2)',
    height: 40,
    width: 350,
    borderRadius: 10,
  },

  searchbar2: {
    flex:1,
    backgroundColor: '#E9E9EA',
    height: 40,
    width: 350,
    borderRadius: 10,
  },

  header: {
    height:150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    
  },

  localtext:{
    color: '#60D937',
    fontSize: 20,
  },
});

export default LocationScreen;
