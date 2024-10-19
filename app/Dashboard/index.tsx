import { View, Dimensions, Platform } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import DashboardFooter from "../CustomComponents/dashboardFooter";
export default function Dashboard() {
  const devHeight = Dimensions.get("window").height;
  return (
    <View
      style={{ height: Platform.OS === "ios" ? devHeight : devHeight + 30 }}
    >
      <MapView
        initialRegion={{
          latitude: 13.124966,
          longitude: 77.589632,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: devHeight }}
      >
        <Marker
          key={1}
          coordinate={{ latitude: 13.124966, longitude: 77.589632 }}
          draggable
        ></Marker>
      </MapView>
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
    </View>
  );
}
