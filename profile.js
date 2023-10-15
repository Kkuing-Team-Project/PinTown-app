import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [fullName, setFullName] = React.useState('');
  const [bio, setBio] = React.useState('');

  const handleSaveProfile = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>프로필 설정 화면</Text>
      {/* 이름 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      {/* 자기 소개 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="자기 소개"
        value={bio}
        onChangeText={(text) => setBio(text)}
      />

      {/* 프로필 저장 버튼 */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveProfile}
      >
        <Text style={styles.saveButtonText}>프로필 저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
