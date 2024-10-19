import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { TextInput } from "react-native";
import BasicButton from "../CustomComponents/BasicButton";
import axios from "axios";
type ReqObj = {
  id: number;
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: string;
  radius: number;
};

const RideshareRequestComponent = ({ radius = 500 }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [request, setRequest] = useState<ReqObj | null>(null);
  const [destination, setDestination] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

    // Clean up interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  async function updateLocation() {
    console.log("Updating location");
    if (!request) return;
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

  async function createRequest() {
    if (!location || !destination) {
      console.log("Destination or location not provided.");
      return;
    }

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

    // Start the interval to update location every 2 seconds
    const id = setInterval(async () => {
      await updateLocation();
    }, 2000);

    // Store the interval ID so it can be cleared later
    setIntervalId(id);
  }

  const checkIfInGeofence = (userLocation: any) => {
    if (!request) return false;

    const distance = getDistance(request.origin, userLocation);

    return distance <= request.radius;
  };

  const checkRequest = () => {
    if (!request) {
      console.log("No active request");
      return;
    }

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
      <Button title="Create Request" onPress={createRequest} />
      {request && (
        <View>
          <Text>Request created for destination: {request.destination}</Text>
          <Button
            title="Sfimulate User Checking Request"
            onPress={checkRequest}
          />
        </View>
      )}
    </View>
  );
};

export default RideshareRequestComponent;
