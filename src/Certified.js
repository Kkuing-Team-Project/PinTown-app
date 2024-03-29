// Certified.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Searchbar, IconButton, MD3Colors } from "react-native-paper";
import fetcher from "../lib/Fetcher";
// import sendSMSAndSaveToDB from './Yong_server/routes/send_sms';

const CertifiedScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [clik, setClik] = useState(true);

  const leftButtton = () => {
    navigation.navigate("Location");
    console.log("ok");
  };

  const ClikButton = () => {
    console.log(phoneNumber, "test");
    setClik(false);
  };

  const NumberButton = async () => {
    // const getNumber = `${phoneNumber}`; // 테스트 용 번호 | phoneNumber 변수 입력 예정
    const getNumber = `${phoneNumber}`;
    if (getNumber) {
      const data = {
        getNumber: getNumber,
      };
      console.log("Request Payload_ phone:", JSON.stringify(data));
      try {
        await fetcher.post("/sms", data);
      } catch (e) {
        console.log(e);
        console.error("인증번호 발송 오류 즉 김도현");
      }
      console.log("인증번호 발송");
    } else {
      console.error("전화번호가 입력되지 않았습니다.");
    }
  };

  const CertifiedButton = async () => {
    const getNumber = `${phoneNumber}`;

    if (password) {
      const data = {
        password: password,
        getNumber: getNumber,
      };
      console.log("Request Payload 이용욱:", JSON.stringify(data));

      try {
        const repo_data = await fetcher.post("/auth", data);
        console.log(repo_data.data);
        console.log("인증번호 발송");
        if (repo_data.data.check) {
          navigation.navigate("Profile");
        }
      } catch (e) {
        console.error(e);
        console.error("인증번호가 틀렸어현");
      }
    } else {
      console.error("전화번호가 입력되지 않았습니다.");
    }
  };

  if (clik == true) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
        </View>
        <Text style={styles.title_txt}>
          안녕하세요! 휴대폰 번호로 가입해주세요.
        </Text>
        <Text style={styles.text}>
          휴대폰 번호는 안전하게 보관되며 이웃들에게 제공되지 않아요.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="휴대폰 번호(- 없이 숫자만 입력)"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <TouchableOpacity style={styles.signupButton} onPress={ClikButton}>
          <Text style={styles.signupButtonText}>인증 문자받기</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles2.container}>
        <View style={styles2.header}>
          <IconButton
            icon="arrow-left"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={leftButtton}
          />
        </View>
        <TextInput
          // 전화번호 입력 코드
          style={styles2.input}
          placeholder="휴대폰 번호(- 없이 숫자만 입력)"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <TouchableOpacity style={styles2.signupButton} onPress={NumberButton}>
          <Text style={styles2.signupButtonText}>인증 문자받기</Text>
        </TouchableOpacity>

        <TextInput
          style={styles2.input2}
          placeholder="인증번호 입력"
          secureTextEntry={false} // 비밀번호 마스킹
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles2.text}>
          어떤 경우에도 타인에게 공유하지 마세요!
        </Text>
        <TouchableOpacity
          style={styles2.signupButton2}
          onPress={CertifiedButton}
        >
          <Text style={styles2.signupButtonText}>동의하고 시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title_txt: {
    //justifyContent: 'center',
    top: -80,
    color: "black",
    fontSize: 30,
    padding: 30,
  },
  text: {
    top: -130,
    color: "black",
    padding: 33,
  },

  input: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    width: "90%",
    height: "7%",
    top: -140,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
  },

  signupButton: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    marginTop: 10,
    top: -140,
    backgroundColor: "#4BAF4B",
    padding: 10,
    width: "90%",
    height: "7%",
    borderRadius: 5,
  },

  signupButtonText: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },

  header: {
    height: 170,
    justifyContent: "center",
    verticalAlign: "auto",
    padding: 20,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    top: -70,
    color: "black",
    padding: 33,
  },

  input: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    width: "90%",
    height: "7%",
    top: -60,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
  },

  input2: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    width: "90%",
    height: "7%",
    top: -40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
  },

  signupButton: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    marginTop: 10,
    top: -60,
    backgroundColor: "#60D937",
    padding: 10,
    width: "90%",
    height: "7%",
    borderRadius: 5,
  },

  signupButton2: {
    alignSelf: "center", // 가로 중앙으로 배치
    justifyContent: "center", // 세로 중앙으로 배치
    marginTop: 10,
    top: -100,
    backgroundColor: "#60D937",
    padding: 10,
    width: "90%",
    height: "7%",
    borderRadius: 5,
  },

  signupButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },

  header: {
    height: 170,
    justifyContent: "center",
    verticalAlign: "auto",
    padding: 20,
  },
});

export default CertifiedScreen;
