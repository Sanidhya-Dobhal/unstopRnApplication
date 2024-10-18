import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

export default function DashboardFooter() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("BestRoutes/index");
        }}
      >
        <Image
          source={require("../../Images/bestRouteIcon.svg")}
          style={styles.imgIconStyle}
        />
        <Text>Best route</Text>
      </Pressable>
      <Pressable>
        <Image
          source={require("../../Images/carpool.svg")}
          style={styles.imgIconStyle}
        />
        <Text>Car pool</Text>
      </Pressable>
      <Pressable>
        <Image
          source={require("../../Images/carParking.svg")}
          style={styles.imgIconStyle}
        />
        <Text>Parking</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  imgIconStyle: {
    height: 40,
    width: 40,
    marginHorizontal: "auto",
  },
});
