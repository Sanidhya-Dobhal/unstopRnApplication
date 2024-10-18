import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Image } from "expo-image";
import BasicButton from "../CustomComponents/BasicButton.tsx";
import axios from "axios";
export default function Dashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState("DRIVE");
  const [startingPoint, setStartingPoint] = useState("");
  const [endingPoint, setEndingPoint] = useState("");
  function vehiclePressHandler(vehicle: string) {
    console.log("The vehicle", vehicle);
    setSelectedVehicle(vehicle);
  }
  async function optimumRouteSearchHandler() {
    const optimumRouteResp = await axios.post(
      "https://unstop-final-backend.onrender.com/optimumroutes",
      {
        origin: startingPoint,
        destination: endingPoint,
        travelModes: selectedVehicle,
      }
    );
    console.log(optimumRouteResp.data.msg.routes);
  }
  return (
    <View style={styles.parentView}>
      <View style={{ paddingTop: 50 }}>
        <View>
          <Text>Starting Location</Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 2,
              fontSize: 25,
              paddingHorizontal: 7,
              paddingVertical: 5,
            }}
            onChangeText={setStartingPoint}
            value={startingPoint}
          />
        </View>
        <View>
          <Text>Ending Location</Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 2,
              fontSize: 25,
              paddingHorizontal: 7,
              paddingVertical: 5,
            }}
            onChangeText={setEndingPoint}
            value={endingPoint}
          />
        </View>
        <View style={styles.allVehiclesView}>
          <Pressable
            style={[
              styles.individualVehicleStyle,
              {
                backgroundColor:
                  selectedVehicle === "DRIVE" ? "#30FF30" : "#FFFFFF",
              },
            ]}
            onPress={() => {
              vehiclePressHandler("DRIVE");
            }}
          >
            <Image
              source={require("../Images/car.svg")}
              style={{ height: 25, width: 25 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              vehiclePressHandler("WALK");
            }}
            style={[
              styles.individualVehicleStyle,
              {
                backgroundColor:
                  selectedVehicle === "WALK" ? "#30FF30" : "#FFFFFF",
              },
            ]}
          >
            <Image
              source={require("../Images/walkingMan.svg")}
              style={{ height: 25, width: 25 }}
            />
          </Pressable>
        </View>
      </View>
      <BasicButton
        text="search"
        onPressButton={() => {
          optimumRouteSearchHandler();
        }}
        isLeft={true}
      />
      <MapView
        style={{ height: 500, marginBottom: 30 }}
        initialRegion={{
          latitude: 13.124966,
          longitude: 77.589632,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          key={1}
          coordinate={{ latitude: 13.124966, longitude: 77.589632 }}
          draggable
        ></Marker>
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "space-between",
    marginRight: 20,
  },
  allVehiclesView: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  individualVehicleStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
});