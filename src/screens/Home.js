import React from 'react';
import { Center, HStack, SimpleGrid, VStack } from 'native-base';
import { Alert } from 'react-native';
import SquareButton from '../components/SquareButton';

export const Home = ({ navigation }) => {

  return (
    <Center flex={1}>
      <VStack space={4}>
        <SimpleGrid minChildWidth={50} w='80%'>
          <SquareButton
            onPress={() => navigation.navigate('WhatsappLink')}
            iconName="whatsapp"
            buttonText="WhatsApp Link"
          />
          <SquareButton
            onPress={() => navigation.navigate('QrScanner')}
            iconName="qrcode"
            buttonText="QR Scanner"
          />
          <SquareButton
            onPress={() => navigation.navigate('QrGenerator')}
            iconName="qrcode-edit"
            buttonText="QR Generator"
          />
        </SimpleGrid>
      </VStack>
    </Center>
  );
};