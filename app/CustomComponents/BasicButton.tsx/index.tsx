import { View, Text, Button, StyleSheet, Platform } from "react-native";
import React from "react";

export default function BasicButton({
  text,
  onPressButton,
}: {
  text: string;
  onPressButton: () => void;
}) {
  return (
    <View style={styles.buttonStyle}>
      <Button
        title={text}
        color={Platform.OS === "ios" ? "white" : ""}
        onPress={onPressButton}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    width: "30%",
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: "rgb(49,108,244)",
    alignSelf: "flex-end",
  },
});
