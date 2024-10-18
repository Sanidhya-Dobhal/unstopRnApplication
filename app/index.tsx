import { StyleSheet, Text, TextInput, View } from "react-native";
import BasicButton from "./CustomComponents/BasicButton.tsx";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  async function onNext() {
    const respFromBackEnd = await axios.post(
      "https://unstop-final-backend.onrender.com/login",
      {
        name: name,
        phone_no: phoneNumber,
      }
    );
    navigation.navigate("OtpValidation/index");
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginLeft: 20,
      }}
    >
      <Text>Name</Text>
      <TextInput
        style={styles.textInputStyles}
        value={name}
        onChangeText={setName}
      />
      <Text>Phone number</Text>
      <TextInput
        style={styles.textInputStyles}
        keyboardType="numeric"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={{ width: "90%" }}>
        <BasicButton text="Next" onPressButton={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 2,
    width: "90%",
    borderRadius: 20,
    fontSize: 25,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
