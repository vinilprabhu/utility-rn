import React, { useState, useRef } from 'react';
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
  Input,
  FormControl,
  Button,
  Icon,
  Divider,
} from 'native-base';
import { Formik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { countryCodes } from '../constants/countryCodes';
import * as RNLocalize from "react-native-localize";
import colors from '../constants/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Linking, Share } from 'react-native';

export const WhatsappLink = ({ navigation }) => {

  const phoneUtil = PhoneNumberUtil.getInstance();

  const localCountryIdentifier = RNLocalize.getCountry();
  let localCountryCode = countryCodes.find(item => item.identifier == localCountryIdentifier);
  localCountryCode = localCountryCode ? localCountryCode.code : null;

  const onSubmit = (data) => {
    let whatsappUrl = `https://wa.me/${data.countryCode.replace('+', '')}${data.phoneNumber}`;
    console.log('submiting with ', whatsappUrl);
    Linking.openURL(whatsappUrl);
  };

  const onShare = (data) => {
    let shareMessage = `${data.shareMessage}${data.shareMessage ? '\n' : ''}https://wa.me/${data.countryCode.replace('+', '')}${data.phoneNumber}`
    console.log('sharing with ', shareMessage, data);
    Share.share({ message: shareMessage })
  };

  const validate = (values) => {
    try {
      const errors = {};

      let countryIdentifier = countryCodes.find(item => item.code == values.countryCode);
      countryIdentifier = countryIdentifier ? countryIdentifier.identifier : null;

      if (countryIdentifier) {
        try {
          const parsedNumber = phoneUtil.parse(values.phoneNumber, countryIdentifier);
          if (!phoneUtil.isPossibleNumber(parsedNumber)) {
            errors.combinedPhoneNumber = "Invalid phone number!"
            errors.phoneNumber = "Invalid!"
          }
        } catch (error) {
          errors.combinedPhoneNumber = "Invalid phone number!"
          errors.phoneNumber = "Invalid!"
        }
      }
      else {
        errors.combinedPhoneNumber = "Invalid country code!";
        errors.countryCode = "Invalid!";
      }

      return errors;
    } catch (error) {
      console.log({ error })
    }
  }

  const phoneNumberRef = useRef("phoneNumberRef");

  return (
    <Center flex={1} backgroundColor="#cccccc">
      <Center>
        <VStack>
          <HStack
            w='80%'>
            <Formik initialValues={{ countryCode: localCountryCode, phoneNumber: '', shareMessage: '' }} onSubmit={onSubmit} validate={validate}>
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <VStack width="80%" space={4}>

                  <FormControl
                    isInvalid={'combinedPhoneNumber' in errors}
                  >
                    <FormControl.Label>Number to start chat</FormControl.Label>

                    <HStack>
                      <Input
                        variant="outline"
                        keyboardType='phone-pad'
                        onBlur={handleBlur('countryCode')}
                        onChangeText={(text) => {
                          const countryCode = '+' + text.replace(/[^0-9]/g, '');
                          handleChange('countryCode')(countryCode);
                        }}
                        value={values.countryCode}
                        autoFocus={true}
                        returnKeyType={"next"}
                        onSubmitEditing={() => phoneNumberRef.current.focus()}
                      />
                      <Input
                        flex={1}
                        ref={phoneNumberRef}
                        placeholder="Phone"
                        variant="outline"
                        keyboardType='phone-pad'
                        onBlur={handleBlur('phoneNumber')}
                        onChangeText={(text) => {
                          const phoneNumber = text.replace(/[^0-9]/g, '');
                          handleChange('phoneNumber')(phoneNumber);
                        }}
                        value={values.phoneNumber}
                      />
                    </HStack>

                    <FormControl.ErrorMessage>
                      {errors.combinedPhoneNumber}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <Button onPress={handleSubmit}
                    startIcon={<Icon as={FAIcon} name="whatsapp" />}
                    backgroundColor={colors.whatsappGreenColor}>
                    Open in Whatsapp
                  </Button>

                  <Divider />

                  <FormControl.Label>share link with message</FormControl.Label>

                  <Input
                    placeholder="message to share"
                    variant="outline"
                    onBlur={handleBlur('shareMessage')}
                    onChangeText={handleChange('shareMessage')}
                    value={values.shareMessage}
                  />

                  <Button onPress={() => errors == {} ? onShare(values) : null}
                    startIcon={<Icon as={FAIcon} name="share-alt" />}
                    backgroundColor={colors.whatsappBlueColor}>
                    share link
                  </Button>
                </VStack>
              )}
            </Formik>
          </HStack>
        </VStack>
      </Center>
    </Center >
  );
};