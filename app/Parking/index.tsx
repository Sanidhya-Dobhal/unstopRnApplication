import { View, Text, Platform } from "react-native";
import React from "react";
import DashboardFooter from "../CustomComponents/dashboardFooter";

export default function index() {
  return (
    <>
      <View>
        <Text>Parking wala page</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: Platform.OS === "ios" ? "#888888" : "#FFFFFF",
          height: 120,
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
        }}
      >
        <DashboardFooter />
      </View>
    </>
  );
}
