import { Stack } from "expo-router";
import React from "react";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="OtpValidation/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BestRoutes/index" options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard/index" options={{ headerShown: false }} />
      <Stack.Screen name="RideSharing/index" options={{ headerShown: false }} />
    </Stack>
  );
}
