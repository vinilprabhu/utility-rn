import React, {useRef} from 'react';
import {Box, Center, HStack, Square, useToast, VStack} from 'native-base';
import {Animated} from 'react-native';
import SquareButton from '../components/SquareButton';
import IconToast from '../components/IconToast';
import GearIcon from '../components/GearIcon';
import {Easing} from 'react-native-reanimated';

export const Home = ({navigation}) => {
  const toast = useToast();

  const iconNames = {
    whatsAppLink: 'whatsapp',
    qrScanner: 'qrcode',
    qrGenerator: 'qrcode-edit',
  };

  const rotation = useRef(new Animated.Value(0)).current;

  Animated.timing(rotation, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const interpolated = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <Center flex={1}>
      <VStack>
        <Center mb={10}>
          <Box>
            <Animated.View style={{transform: [{rotate: interpolated}]}}>
              <Square size={'xl'}>
                <GearIcon />
              </Square>
            </Animated.View>
          </Box>
        </Center>

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
              onPress={() => {
                toast.closeAll();
                navigation.navigate('QrGenerator');
              }}
              iconName={iconNames.qrGenerator}
              buttonText="QR Generator"
            />
            <SquareButton
              // onPress={() => navigation.navigate('QrGenerator')}
              onPress={() => {
                if (!toast.isActive(iconNames.qrGenerator)) {
                  toast.show({
                    id: iconNames.qrGenerator,
                    _render: () => {
                      return (
                        <IconToast
                          toastText="Coming soon..."
                          iconName={iconNames.qrGenerator}
                        />
                      );
                    },
                    get render() {
                      return this._render;
                    },
                    set render(value) {
                      this._render = value;
                    },
                  });
                }
              }}
              iconName={iconNames.qrGenerator}
              buttonText="QR Generator"
            />
          </HStack>
        </Center>
      </VStack>
    </Center>
  );
};
