import { View, Text, Platform, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import DashboardFooter from "../CustomComponents/dashboardFooter";
import BasicButton from "../CustomComponents/BasicButton";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import axios from "axios";

export default function CarPool({ radius = 500 }) {
  type ReqObj = {
    id: number;
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: string;
    radius: number;
  };
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [request, setRequest] = useState<ReqObj | null>(null);
  const [destination, setDestination] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const createRequest = () => {
    if (!location || !destination)
      return <Text>Destination or location not provided.</Text>;

    const newRequest: ReqObj = {
      id: Date.now(),
      origin: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      destination,
      radius,
    };

    setRequest(newRequest);
    // Here you would typically send this request to your backend
    console.log("New request created:", newRequest);
    console.log("Dnasndksakj");
    async function updateLocation() {
      console.log("Updating location");
      if (!request) return;
      console.log(request.origin.latitude, request.origin.longitude);
      const resp = await axios.post(
        "https://unstop-final-backend.onrender.com/updatelocation",
        {
          latitude: request.origin.latitude,
          longitude: request.origin.longitude,
          phone_no: "8859900177",
        }
      );
      console.log("resp", resp);
    }
    setInterval(() => {
      updateLocation();
    }, 6000);
  };

  const checkIfInGeofence = (userLocation: any) => {
    if (!request) return false;

    const distance = getDistance(request.origin, userLocation);

    return distance <= request.radius;
  };

  // Simulating other users checking the request
  const checkRequest = () => {
    if (!request) {
      console.log("No active request");
      return;
    }

    // Simulate a user's location (in a real app, this would be the current user's location)
    const userLocation = {
      latitude: request.origin.latitude + (Math.random() - 0.5) * 0.01,
      longitude: request.origin.longitude + (Math.random() - 0.5) * 0.01,
    };

    const canSeeRequest = checkIfInGeofence(userLocation);
    console.log(`User ${canSeeRequest ? "can" : "cannot"} see the request`);
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <>
      <View>
        <View style={{ marginTop: 250 }}>
          <Text>
            Your location:
            {location
              ? `${location.coords.latitude}, ${location.coords.longitude}`
              : "Loading..."}
          </Text>
          <TextInput
            placeholder="Enter destination"
            placeholderTextColor={"gray"}
            value={destination}
            onChangeText={setDestination}
          />
          <BasicButton
            text="Request"
            onPressButton={createRequest}
            isLeft={true}
          />
          {request && (
            <View>
              <Text>
                Request created for destination: {request.destination}
              </Text>
              <Button
                title="Simulate User Checking Request"
                onPress={checkRequest}
              />
            </View>
          )}
        </View>
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
