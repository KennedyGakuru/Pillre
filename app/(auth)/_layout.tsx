import { Stack } from 'expo-router';
import React = require('react');

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}