import { StyleSheet, Text, TextInput, View } from "react-native";
import BasicButton from "./CustomComponents/BasicButton";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";

export default function Index() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [areDetailsInvalid, setAreDetailsInvalid] = useState(false);
  async function onNext() {
    if (name.length > 0 && phoneNumber.length === 10) {
      // const respFromBackEnd = await axios.post(
      //   "https://unstop-final-backend.onrender.com/login",
      //   {
      //     name: name,
      //     phone_no: phoneNumber,
      //   }
      // );
      navigation.navigate({
        name: "RideSharing/index",
      });
    } else {
      setAreDetailsInvalid(true);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={require("./Images/car.svg")}
        style={{ width: 100, height: 100, alignSelf: "center" }}
      />
      <View
        style={{
          marginLeft: 20,
        }}
      >
        <Text>Name</Text>
        <TextInput
          style={styles.textInputStyles}
          value={name}
          onChangeText={(t) => {
            setAreDetailsInvalid(false);
            setName(t);
          }}
        />
        <Text>Phone number</Text>
        <TextInput
          style={styles.textInputStyles}
          keyboardType="numeric"
          maxLength={10}
          value={phoneNumber}
          onChangeText={(t) => {
            setAreDetailsInvalid(false);
            setPhoneNumber(t);
          }}
        />
        <Text
          style={{
            marginTop: 10,
            color: "red",
            display: areDetailsInvalid ? "flex" : "none",
          }}
        >
          Enter correct data
        </Text>
        <View style={{ width: "90%" }}>
          <BasicButton text="Next" onPressButton={onNext} isLeft={false} />
        </View>
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
