import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  View,
  Spinner,
  Heading,
  Center,
  Select,
  CheckIcon,
} from 'native-base';
import { countryCodes } from '../constants/countryCodes';

export const WhatsappLink = ({ navigation }) => {
  let [language, setLanguage] = useState("");

  const countryCodeItems = () => {
    return (<Select.Item label="JavaScript" value="js" />)
  }

  return (
    <Center flex={1}>
      <Center>
        <HStack>
          <Select
            selectedValue={language}
            minWidth={200}
            accessibilityLabel="Select your favorite programming language"
            placeholder="Select your favorite programming language"
            onValueChange={(itemValue) => {
              console.log(itemValue);
              return setLanguage(itemValue);
            }}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            {countryCodes.map((countryCode) => <Select.Item label={`${countryCode.name} ${countryCode.flag}${countryCode.dial_code}`} value={`${countryCode.flag}${countryCode.dial_code}`} />)}
          </Select>
        </HStack>
      </Center>
    </Center>
  );
};