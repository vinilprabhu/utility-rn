import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {WhatsappLink} from '../screens/WhatsappLink';
import {Home} from '../screens/Home';
import {QrScanner} from '../screens/QrScanner';
import {QrGenerator} from '../screens/QrGeneratorScreens/QrGenerator';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="WhatsappLink"
        component={WhatsappLink}
        options={{title: 'Whatsapp Link'}}
      />
      <Drawer.Screen
        name="QrScanner"
        component={QrScanner}
        options={{title: 'QR Scanner'}}
      />
      <Drawer.Screen
        name="QrGenerator"
        component={QrGenerator}
        options={{title: 'QR Generator'}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);
