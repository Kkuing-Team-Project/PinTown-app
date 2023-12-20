import React from "react";
import { useState } from "react";
import { IconButton, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Button, TextInput, StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo icons
import fetcher from "../lib/Fetcher";

const Write = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const uploadArticle = async () => {
    try {
      await fetcher.post("/articles", {
        title,
        content,
      });
      navigation.navigate('Main');
      alert("게시글이 등록되었습니다.");

    } catch (e) {
      console.log(e);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const leftButtton = () => {
    //Home으로 이동
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header2}>
          <IconButton icon="arrow-left" iconColor={MD3Colors.error50} size={20} onPress={leftButtton}/>
      </View>
      <View style={styles.header}>
        <Ionicons name="ios-create" size={32} color="#000" />
        <Text style={styles.headerText}>Write Something</Text>
      </View>

      <TextInput
        style={[styles.input, styles.titleInput]}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
        placeholderTextColor="#000"
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        onChangeText={setContent}
        placeholder="자유롭게 이야기나 질문을 해보세요"
        multiline={true}
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.submitButton} onPress={uploadArticle}>
            <Text style={styles.submitButtonText}>등록</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  header2: {
    justifyContent: 'center',
    verticalAlign:'auto',
    marginLeft:'-80%'
  },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#000",
  },
  input: {
    width: '90%',
    height: '7%',
    borderWidth: 1,
    borderColor: '#60D937',
    padding:15,
    borderRadius: 8,
    fontSize: 10,
    color: "#000",
    marginBottom: 16,
    alignSelf: 'center'
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentInput: {
    minHeight: 150,
    fontSize: 15,
    textAlignVertical: "top",
  },
  submitButton: {
      alignSelf: 'center', // 가로 중앙으로 배치
      justifyContent: 'center', // 세로 중앙으로 배치
      backgroundColor:  '#60D937',
      padding: 10,
      width: '90%',
      height: '7%',
      borderRadius: 10,
      marginBottom: 60,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:20,
  },
});

export default Write;
