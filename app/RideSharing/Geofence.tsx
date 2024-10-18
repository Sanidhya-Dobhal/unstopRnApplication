import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { TextInput } from "react-native";
import BasicButton from "../CustomComponents/BasicButton";
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
      <BasicButton text="Request" onPressButton={createRequest} isLeft={true} />
      {request && (
        <View>
          <Text>Request created for destination: {request.destination}</Text>
          <Button
            title="Simulate User Checking Request"
            onPress={checkRequest}
          />
        </View>
      )}
    </View>
  );
};

export default RideshareRequestComponent;
