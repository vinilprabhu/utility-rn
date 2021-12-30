import React from 'react';
import {Icon} from 'native-base';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TextQrCode} from './TextQrCode';
import {UrlQrCode} from './UrlQrCode';
import {ContactQrCode} from './ContactQrCode';

const Tab = createMaterialTopTabNavigator();

export const QrGenerator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarBounces: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
        },
      }}>
      <Tab.Screen
        name="Text"
        component={TextQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="text-box" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="text-box" color="secondary.500" />
            ),
        }}
      />

      <Tab.Screen
        name="URL"
        component={UrlQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="link" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="link" color="secondary.500" />
            ),
        }}
      />

      <Tab.Screen
        name="Contact"
        component={ContactQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon
                as={MCIcons}
                name="card-account-details"
                color="primary.500"
              />
            ) : (
              <Icon
                as={MCIcons}
                name="card-account-details"
                color="secondary.500"
              />
            ),
        }}
      />

      <Tab.Screen
        name="phone"
        component={TextQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="phone" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="phone" color="secondary.500" />
            ),
        }}
      />

      <Tab.Screen
        name="sms"
        component={TextQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="message-text" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="message-text" color="secondary.500" />
            ),
        }}
      />

      <Tab.Screen
        name="email"
        component={TextQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="message-text" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="message-text" color="secondary.500" />
            ),
        }}
      />

      <Tab.Screen
        name="email2"
        component={TextQrCode}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon as={MCIcons} name="message-text" color="primary.500" />
            ) : (
              <Icon as={MCIcons} name="message-text" color="secondary.500" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
