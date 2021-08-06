import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { WhatsappLink } from '../screens/WhatsappLink';
import { Home } from '../screens/Home';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        name="WhatsappLink"
        component={WhatsappLink}
        options={{ title: 'Whatsapp Link' }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);
