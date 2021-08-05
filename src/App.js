import React from 'react';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
import { AppNavigator } from './navigation/AppNavigator';

export default function () {
  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}