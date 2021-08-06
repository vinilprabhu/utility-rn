import React from 'react';
import { Center, HStack, VStack } from 'native-base';
import { Alert } from 'react-native';
import SquareButton from '../components/SquareButton';

export const Home = ({ navigation }) => {

  return (
    <Center flex={1}>
      <VStack space={4}>
        <HStack space={4}>
          <SquareButton
            onPress={() => navigation.navigate('WhatsappLink')}
            iconName="whatsapp"
            buttonText="WhatsApp Link"
          />
          {/* <SquareButton
            onPress={() => Alert.alert("QR Scanner")}
            iconName="qrcode"
            buttonText="QR Scanner"
          /> */}
        </HStack>
      </VStack>
    </Center>
  );
};