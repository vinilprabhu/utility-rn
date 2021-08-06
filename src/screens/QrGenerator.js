import React, { useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Box, Button, Center, Pressable, Text, VStack } from 'native-base';
import { Linking, PermissionsAndroid, StyleSheet } from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

export const QrGenerator = () => {

  let qrCodeRef = null;

  const shareQrCode = async (dataURL) => {
    let shareImageBase64 = {
      title: 'QR Code',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };

    Share.open(shareImageBase64)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  return (
    <Center flex={1}>
      <VStack>
        <QRCode
          getRef={(c) => (qrCodeRef = c)}
          value="http://awesome.link.qr"
        />
        <Button
          onPress={() => qrCodeRef.toDataURL(shareQrCode)}>
          Share
        </Button>
      </VStack>
    </Center>
  )
}