import React from 'react';
import { Box, Center, HStack, Icon, useToast, VStack } from 'native-base';
import SquareButton from '../components/SquareButton';
import IconToast from '../components/IconToast';

export const Home = ({ navigation }) => {

  const toast = useToast();

  const iconNames = {
    whatsAppLink: "whatsapp",
    qrScanner: "qrcode",
    qrGenerator: "qrcode-edit",
  }

  return (
    <Center flex={1}>
      <VStack>

        <Center>
          <HStack>
            <SquareButton
              onPress={() => {
                toast.closeAll();
                navigation.navigate('WhatsappLink');
              }}
              iconName={iconNames.whatsAppLink}
              buttonText="WhatsApp Link"
            />
            <SquareButton
              onPress={() => {
                toast.closeAll();
                navigation.navigate('QrScanner');
              }}
              iconName={iconNames.qrScanner}
              buttonText="QR Scanner"
            />
          </HStack>
        </Center>

        <Center>
          <HStack>
            <SquareButton
              // onPress={() => navigation.navigate('QrGenerator')}
              onPress={() => {
                if (!toast.isActive(iconNames.qrGenerator))
                  toast.show({
                    id: iconNames.qrGenerator,
                    render: () => {
                      return <IconToast toastText="Coming soon..." iconName={iconNames.qrGenerator} />
                    },
                  })
              }
              }
              iconName={iconNames.qrGenerator}
              buttonText="QR Generator"
            />
          </HStack>
        </Center>

      </VStack>
    </Center>
  );
};