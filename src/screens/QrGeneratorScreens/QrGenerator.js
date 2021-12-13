import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Radio,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import WifiManager from 'react-native-wifi-reborn';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getConnectedWifi = async () => {
  try {
    let currentWifiSSID = await WifiManager.getCurrentWifiSSID();
    console.log({currentWifiSSID});
    let currentSignalStrength = await WifiManager.getCurrentSignalStrength();
    console.log({currentSignalStrength});
  } catch (error) {
    console.log({error});
  }
};

export const QrGenerator = () => {
  let qrCodeRef = null;

  const [qrCodeType, setQrCodeType] = useState(0);

  const shareQrCode = async dataURL => {
    let shareImageBase64 = {
      title: 'QR Code',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };

    Share.open(shareImageBase64)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  getConnectedWifi();

  return (
    <Center flex={1} px={3}>
      <ScrollView w="90%">
        <Stack>
          <Stack>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={qrCodeType}
              onChange={nextValue => {
                setQrCodeType(nextValue);
              }}>
              <HStack>
                <VStack m={5} alignItems="flex-start">
                  <Radio
                    colorScheme="secondary"
                    value={0}
                    my={1}
                    icon={<Icon as={MCIcons} name="format-color-text" />}>
                    Text
                  </Radio>
                  <Radio
                    colorScheme="secondary"
                    value={1}
                    my={1}
                    icon={<Icon as={MCIcons} name="link" />}>
                    Link
                  </Radio>
                  <Radio
                    colorScheme="secondary"
                    value={2}
                    my={1}
                    icon={<Icon as={MCIcons} name="account" />}>
                    Contact
                  </Radio>
                </VStack>
                <VStack m={5} alignItems="flex-start">
                  <Radio
                    colorScheme="secondary"
                    value={3}
                    my={1}
                    icon={<Icon as={MCIcons} name="link" />}>
                    Link
                  </Radio>
                  <Radio
                    colorScheme="secondary"
                    value={4}
                    my={1}
                    icon={<Icon as={MCIcons} name="link" />}>
                    Link
                  </Radio>
                  <Radio
                    colorScheme="secondary"
                    value={5}
                    my={1}
                    icon={<Icon as={MCIcons} name="link" />}>
                    Link
                  </Radio>
                </VStack>
              </HStack>
            </Radio.Group>
            <Text>qrCodeType:{qrCodeType}</Text>
          </Stack>
          {/* <Stack
            visibility="hidden"
            space={2.5}
            alignSelf="center"
            px="4"
            safeArea
            mt="4"
            w={{
              base: '100%',
              md: '25%',
            }}>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Default
              </Text>
              <FormControl mb="5">
                <FormControl.Label>Project Title</FormControl.Label>
                <Input />
                <FormControl.HelperText>
                  Give your project a title.
                </FormControl.HelperText>
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Disabled
              </Text>
              <FormControl isDisabled mb="5">
                <FormControl.Label
                  _disabled={{
                    _text: {
                      color: 'gray.400',
                      fontWeight: 'bold',
                    },
                  }}>
                  Project Title
                </FormControl.Label>
                <Input placeholder="Title" />
                <FormControl.HelperText>
                  Give your project a title.
                </FormControl.HelperText>
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Invalid
              </Text>
              <FormControl isInvalid>
                <FormControl.Label>Project Title</FormControl.Label>
                <Input placeholder="Title" />
                <FormControl.ErrorMessage>
                  Something is wrong.
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
          </Stack> */}
        </Stack>
      </ScrollView>
      {/* <QRCode getRef={c => (qrCodeRef = c)} value="http://awesome.link.qr" />
        <Button onPress={() => qrCodeRef.toDataURL(shareQrCode)}>Share</Button> */}
    </Center>
  );
};
