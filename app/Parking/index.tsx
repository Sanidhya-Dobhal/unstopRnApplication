import {
  View,
  Text,
  Platform,
  Dimensions,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import DashboardFooter from "../CustomComponents/dashboardFooter";
import MapView, { Marker } from "react-native-maps";
import BasicButton from "../CustomComponents/BasicButton";
import axios from "axios";

export default function index() {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 13.124966,
    longitude: 77.589632,
  });
  const [enteredRadius, setEnteredRadius] = useState("");
  const devHeight = Dimensions.get("window").height;
  const [usefulArr, setUsefulArr] = useState([]);
  async function getParkingCall() {
    Keyboard.dismiss();
    console.log("reaching here");
    const locationParam = `${markerCoords.latitude}, ${markerCoords.longitude}`;
    console.log(locationParam, "   ", enteredRadius);
    const resp = await axios.post(
      "https://unstop-final-backend.onrender.com/getparking",
      {
        location: locationParam,
        radius: enteredRadius + "00",
      }
    );
    const usefulDataFromResp = resp.data.msg.results;
    const usefulLocations = [];
    for (let i = 0; i < usefulDataFromResp.length; i++) {
      usefulLocations.push(usefulDataFromResp[i].geometry.location);
    }
    const usefulObj = usefulLocations.map((parking) => ({
      latitude: parking.lat,
      longitude: parking.lng,
    }));
    console.log(usefulObj);
    setUsefulArr(usefulObj);
  }
  return (
    <>
      <View style={{ marginTop: 50, width: "90%", marginHorizontal: "auto" }}>
        <Text>Enter radius within which you want to find parkings</Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 7,
            marginVertical: 20,
            alignItems: "flex-end",
          }}
        >
          <TextInput
            style={styles.textInputStyles}
            keyboardType="numeric"
            maxLength={2}
            value={enteredRadius}
            onChangeText={setEnteredRadius}
          />
          <Text style={{ fontSize: 25 }}>Km</Text>
        </View>
      </View>
      <View>
        <BasicButton
          text="Get parking"
          onPressButton={getParkingCall}
          isLeft={true}
        />
        <MapView
          initialRegion={{
            latitude: 13.124966,
            longitude: 77.589632,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ height: devHeight - 100, marginTop: 10 }}
        >
          <Marker
            key={1}
            coordinate={{ latitude: 13.124966, longitude: 77.589632 }}
            draggable
            onDragEnd={(e) => {
              setMarkerCoords(e.nativeEvent.coordinate);
            }}
          ></Marker>
          {usefulArr.map((parking, index) => (
            <Marker key={index + 1} coordinate={parking} pinColor="blue" />
          ))}
        </MapView>
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
const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 2,
    borderRadius: 2,
    fontSize: 25,
    width: "80%",
    marginHorizontal: 10,
  },
});
