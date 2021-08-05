import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Center } from 'native-base';
import { WhatsappLink } from '../screens/WhatsappLink';

function HomeScreen({ navigation }) {
  return (
    <Center style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('WhatsappLink')}
      >
        Go to Whatsapp Link
      </Button>
    </Center>
  );
}

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
    // initialRouteName="Home"
    >
      {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
      <Drawer.Screen name="WhatsappLink" component={WhatsappLink} />
    </Drawer.Navigator>
  </NavigationContainer>
);
