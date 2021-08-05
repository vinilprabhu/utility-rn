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
import { Picker } from '@react-native-picker/picker';

export const WhatsappLink = ({ navigation }) => {

  const [countryCode, setCountryCode] = useState({
    name: "India",
    code: "+91",
    countryCode: "IN",
    flag: "🇮🇳"
  });

  return (
    <Picker
      enabled={true}
      mode="dropdown"
      placeholder="Select City"
      // onValueChange={formik.handleChange('countryCode')}
      onValueChange={(itemValue, itemIndex) => {
        console.log(itemValue, itemIndex, countryCode)
        if (!itemValue)
          return;
        setCountryCode(itemValue)
      }}
      selectedValue={countryCode.name + countryCode.code}
      prompt="ssssss"
    >
      {countryCodes.map((item) => <Picker.Item label={`${item.flag}${item.code}`} value={item} key={item.code} />)}
    </Picker>
  );
};