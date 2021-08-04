import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Center } from 'native-base';

function HomeScreen({ navigation }) {
  return (
    <Center style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
      >
        Go to notifications
      </Button>
    </Center>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <Center style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.goBack()}
      >
        Go back home
      </Button>
    </Center>
  );
}

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);
