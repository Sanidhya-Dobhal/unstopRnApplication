import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function index() {
  return (
    <View style={styles.parentDiv}>
      <Text>Enter OTP</Text>
      <TextInput
        style={styles.textInputStyles}
        keyboardType="numeric"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  parentDiv: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  textInputStyles: {
    borderWidth: 2,
    width: "90%",
    borderRadius: 20,
    fontSize: 25,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
