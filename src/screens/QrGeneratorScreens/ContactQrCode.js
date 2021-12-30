import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Stack,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import QRCreator from '../../components/QRCreator';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../common/colors';

export const ContactQrCode = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    address: '',
    phoneArray: [],
  });

  const formatPhoneData = () => {
    let formattedPhoneData = '';
    for (const phone of formData.phoneArray) {
      formattedPhoneData += `TEL:${phone}\n`;
    }
    return formattedPhoneData;
  };

  const text = `BEGIN:VCARD
VERSION:3.0
N:${formData.name}
ORG:${formData.company}
EMAIL:${formData.email}
URL:${formData.website}
${formatPhoneData()}
ADR:${formData.address}
END:VCARD`;

  console.log(formData);

  const renderPhoneViews = () => {
    const phoneArray = formData.phoneArray;
    let hasEmptyPhone = false;
    for (const phone of phoneArray) {
      if (phone === '') {
        hasEmptyPhone = true;
        break;
      }
    }
    if (!hasEmptyPhone) {
      phoneArray.push('');
    }
    return phoneArray.map((phone, index) => (
      <HStack alignItems="center" m={2} key={index}>
        <Icon as={MCIcons} name="phone-outline" color="primary.500" mr={2} />
        <Input
          keyboardType="phone-pad"
          placeholder="Phone"
          onChangeText={value => setFormPhoneData(index, value)}
          value={phone}
          flex={1}
        />
        <IconButton
          colorScheme="secondary"
          isDisabled={index === phoneArray.length - 1}
          ml={2}
          onPress={() => {
            phoneArray.splice(index, 1);
            setFormData({...formData, phoneArray});
          }}
          icon={
            <Icon
              as={MCIcons}
              name="close"
              color={
                index === phoneArray.length - 1
                  ? colors.transparentColor
                  : 'secondary.500'
              }
            />
          }
        />
      </HStack>
    ));
  };

  const setFormPhoneData = (index, value) => {
    let phoneArray = formData.phoneArray;
    phoneArray[index] = value;
    setFormData({...formData, phoneArray});
  };

  return (
    <VStack mx={2} flex={1}>
      <Center flex={1}>
        <ScrollView w="90%">
          <Stack pb={10}>
            <Stack
              space={2.5}
              alignSelf="center"
              px="4"
              safeArea
              mt="4"
              w={{
                base: '100%',
                md: '25%',
              }}>
              <Box mb={5}>
                <VStack>
                  <HStack alignItems="center" m={2}>
                    <Icon
                      as={MCIcons}
                      name="account-outline"
                      color="primary.500"
                      mr={2}
                    />
                    <Input
                      placeholder="Name"
                      value={formData.name}
                      onChangeText={value =>
                        setFormData({...formData, name: value})
                      }
                      flex={1}
                    />
                  </HStack>
                  <Divider />
                  <HStack alignItems="center" m={2}>
                    <Icon
                      as={MCIcons}
                      name="briefcase-outline"
                      color="primary.500"
                      mr={2}
                    />
                    <Input
                      placeholder="Company"
                      value={formData.company}
                      onChangeText={value =>
                        setFormData({...formData, company: value})
                      }
                      flex={1}
                    />
                  </HStack>
                  <Divider />
                  <VStack>{renderPhoneViews()}</VStack>
                  <Divider />
                  <HStack alignItems="center" m={2}>
                    <Icon
                      as={MCIcons}
                      name="email-outline"
                      color="primary.500"
                      mr={2}
                    />
                    <Input
                      placeholder="Email"
                      value={formData.email}
                      onChangeText={value =>
                        setFormData({...formData, email: value})
                      }
                      flex={1}
                    />
                  </HStack>
                  <Divider />
                  <HStack alignItems="center" m={2}>
                    <Icon as={MCIcons} name="link" color="primary.500" mr={2} />
                    <Input
                      placeholder="Website"
                      value={formData.website}
                      onChangeText={value =>
                        setFormData({...formData, website: value})
                      }
                      flex={1}
                    />
                  </HStack>
                  <Divider />
                  <HStack alignItems="center" m={2}>
                    <Icon
                      as={MCIcons}
                      name="map-marker-outline"
                      color="primary.500"
                      mr={2}
                    />
                    <Input
                      placeholder="Address"
                      value={formData.address}
                      onChangeText={value =>
                        setFormData({...formData, address: value})
                      }
                      flex={1}
                    />
                  </HStack>
                  <Divider />
                </VStack>
              </Box>
            </Stack>

            <QRCreator
              data={{
                text,
                type: 0,
              }}
            />
          </Stack>
        </ScrollView>
      </Center>
    </VStack>
  );
};
