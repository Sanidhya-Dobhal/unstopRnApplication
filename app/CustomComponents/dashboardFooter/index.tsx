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
          navigation.navigate("Dashboard/index");
        }}
      >
        <Image
          source={require("../../Images/map.svg")}
          style={styles.imgIconStyle}
        />
        <Text>Map</Text>
      </Pressable>
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
      <Pressable
        onPress={() => {
          navigation.navigate("carPool/index");
        }}
      >
        <Image
          source={require("../../Images/carpool.svg")}
          style={styles.imgIconStyle}
        />
        <Text>Car pool</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Parking/index");
        }}
      >
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
