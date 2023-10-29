import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Platform, TextInput, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { CameraRoll } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [imageUri, setImageUri] = useState(null);
  const [nickname, setNickname] = useState('');
  const [features, setFeatures] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take pictures.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openImagePicker();
        } else {
          console.warn('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      openImagePicker();
    }
  };

  const handleSaveProfile = () => {
    //Home으로 이동
    navigation.navigate('Home');
  };

  const openImagePicker = () => {
    ImagePicker.showImagePicker({ title: 'Select Profile Picture' }, response => {
      if (response.uri) {
        setImageUri(response.uri);
        // 이미지를 저장
        saveImage(response.uri);
      }
    });
  };

  const saveImage = async (imageUri) => {
    try {
      await CameraRoll.saveToCameraRoll(imageUri, 'photo');
      console.log('Image saved to camera roll');
    } catch (error) {
      console.error('Failed to save image: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={requestCameraPermission} style={styles.uploadButton}>
          <Text>Upload Profile Picture</Text>
        </TouchableOpacity>
      )}

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickname}
        onChangeText={(text) => setNickname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="특징"
        value={features}
        onChangeText={(text) => setFeatures(text)}
      />

      <Text style={styles.text}>성별 선택</Text>
      <Picker
        style={styles.picker}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}>
        <Picker.Item label="여성" value="여성" />
        <Picker.Item label="남성" value="남성" />
        <Picker.Item label="비공개" value="비공개" />
      </Picker>

      <Text style={styles.text}>나이 선택</Text>
      <Picker
        style={styles.picker2}
        selectedValue={age}
        onValueChange={(itemValue) => setAge(itemValue)}>
        <Picker.Item label="10대" value="10대" />
        <Picker.Item label="20대" value="20대" />
        <Picker.Item label="30대" value="30대" />
      </Picker>

      {/* 다른 프로필 정보 입력 필드 및 저장 버튼 추가 */}

      {/* 프로필 저장 버튼 */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveProfile}
      >
        <Text style={styles.saveButtonText}>프로필 저장</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  uploadButton: {
    alignSelf: 'center',
    padding: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 0,
    marginBottom:50,
    
  },
  picker2: {
    height: 20,
    marginBottom: 200,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

});

export default ProfileScreen;
