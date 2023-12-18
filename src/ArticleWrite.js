import { useState } from "react";
import { Button, TextInput, StyleSheet, SafeAreaView } from "react-native";

const Write = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const uploadArticle = async () => {
    try {
      await fetcher.post("/articles", {
        title,
        content,
      });

      alert("게시글이 등록되었습니다.");
    } catch (e) {
      console.log(e);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.titleInput}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
      />
      <TextInput
        style={styles.contentInput}
        onChangeText={setContent}
        placeholder="자유롭게 이야기나 질문을 해보세요"
        multiline={true}
      />
      <Button title="등록" onPress={uploadArticle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    borderBottomColor: "#F0F0F0",
  },
  contentInput: {
    paddingBottom: 10,
    minHeight: 150,
    marginTop: 10,
    fontSize: 15,
    textAlignVertical: "top",
    borderBottomColor: "#F0F0F0",
  },
});

export default Write;