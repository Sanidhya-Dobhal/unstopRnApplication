import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { Image } from "expo-image";
import BasicButton from "../CustomComponents/BasicButton";
import axios from "axios";
import DashboardFooter from "../CustomComponents/dashboardFooter";
export default function BestRoutes() {
  const [selectedVehicle, setSelectedVehicle] = useState("DRIVE");
  const [startingPoint, setStartingPoint] = useState("");
  const [endingPoint, setEndingPoint] = useState("");
  const [polylineData, setPolylineData] = useState([]);
  const [isTime, setIsTime] = useState(false);
  const [time, setTime] = useState("");
  const devHeight = Dimensions.get("window").height;
  function vehiclePressHandler(vehicle: string) {
    console.log("The vehicle", vehicle);
    setSelectedVehicle(vehicle);
  }
  function convertSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} h:${minutes} m:${remainingSeconds} s`;
  }

  function polylineDecoder(encodedPolyline: string) {
    const decodedCoordinates = polyline.decode(encodedPolyline);
    const decodedCoordinatesObjectArray = decodedCoordinates.map(
      ([latitude, longitude]) => ({
        latitude: latitude,
        longitude: longitude,
      })
    );
    setPolylineData(decodedCoordinatesObjectArray);
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
    Keyboard.dismiss();
    console.log(optimumRouteResp.data);
    const optimumRouteInfo = optimumRouteResp.data.msg.routes;
    console.log("logged 1", optimumRouteInfo[0].polyline.encodedPolyline);
    polylineDecoder(optimumRouteInfo[0].polyline.encodedPolyline);
    setIsTime(true);
    const durInSec = optimumRouteInfo[0].duration;
    const timeInHrs = convertSecondsToTime(
      Number(durInSec.substring(0, durInSec.length - 1))
    );
    setTime(timeInHrs);
    console.log("time is", optimumRouteInfo[0].duration);
    console.log("I am here");
  }
  return (
    <>
      <View style={[styles.parentView, { height: devHeight }]}>
        <View style={{ paddingTop: 50 }}>
          <View style={{ marginHorizontal: 20 }}>
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
        </View>
        <Text style={{ display: isTime ? "flex" : "none" }}>
          Estimated Time:<Text style={{ fontWeight: 600 }}>{time}</Text>
        </Text>
        <MapView
          style={{ height: 430, width: "100%" }}
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
          <Polyline
            coordinates={polylineData}
            strokeColor={Platform.OS === "ios" ? "pink" : "blue"}
            strokeWidth={5}
          />
        </MapView>
        <View style={{ height: 30 }}></View>
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
        <DashboardFooter></DashboardFooter>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  parentView: {
    flex: 1,

    justifyContent: "space-between",
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
