import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function Index() {
  async function verifyOTPCaller(enteredOTP: string) {
    console.log("sadjk", typeof enteredOTP);
    const resp = await axios.post(
      "https://unstop-final-backend.onrender.com/verifyOTP",
      {
        phone_no: Platform.OS === "ios" ? "8859900177" : "7558483544",
        otp: enteredOTP,
      }
    );
    console.log("resppp", resp);
    if (resp.data.msg === "approved") {
      navigation.navigate("BestRoutes/index");
    } else {
      setIsWrongOtpEntered(true);
    }
  }
  const navigation = useNavigation();
  const [isWrongOtpEntered, setIsWrongOtpEntered] = useState(false);
  return (
    <View style={styles.parentView}>
      <Text>Enter OTP</Text>
      <OtpInput
        numberOfDigits={6}
        focusColor="green"
        theme={{ pinCodeContainerStyle: styles.containerStyle }}
        onFilled={(enteredOTP) => {
          verifyOTPCaller(enteredOTP);
        }}
        onTextChange={(enteredOTP) => {
          if (enteredOTP.length < 6) {
            setIsWrongOtpEntered(false);
          }
        }}
      />
      <Text
        style={{
          marginTop: 10,
          color: "red",
          display: isWrongOtpEntered ? "flex" : "none",
        }}
      >
        Wrong OTP Entered
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  textInputStyles: {
    borderWidth: 2,
    width: "90%",
    borderRadius: 20,
    fontSize: 25,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  containerStyle: {
    borderWidth: 2,
    borderColor: "black",
  },
});
