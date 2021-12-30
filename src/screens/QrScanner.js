import React, {useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  AlertDialog,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  Spinner,
} from 'native-base';
import {PermissionsAndroid, StyleSheet} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import enums from '../common/enums';

export const QrScanner = ({navigation}) => {
  const [wifiConnectData, setWifiConnectData] = useState(null);

  const [flashMode, setFlashMode] = useState('flash-off');
  const [scannerFlashMode, setScannerFlashMode] = useState(
    RNCamera.Constants.FlashMode.off,
  );

  const [alertHeading, setAlertHeading] = useState('Scanning Result');
  const [alertBody, setAlertBody] = useState('');
  const [alertPrimaryButtonText, setAlertPrimaryButtonText] = useState('Share');
  const [alertPrimaryButtonOnPressType, setAlertPrimaryButtonOnPressType] =
    useState(enums.ScannerAlertPrimaryButtonOnPressType.Share);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const qRCodeScannerRef = useRef('qRCodeScannerRef');

  const onScanningSuccess = e => {
    const data = e.data;
    if (data.startsWith('BEGIN:VCARD') || data.startsWith('MECARD:')) {
      console.log('contact', data);
    } else if (
      data.toLowerCase().startsWith('http://') ||
      data.toLowerCase().startsWith('https://')
    ) {
      console.log('url', data);
    } else if (data.toLowerCase().startsWith('mailto:')) {
      console.log('email', data);
    } else if (data.toLowerCase().startsWith('matmsg:')) {
      console.log('email with data', data);
    } else if (data.toLowerCase().startsWith('smsto:')) {
      console.log('sms', data);
    } else if (data.toLowerCase().startsWith('wifi:')) {
      processwifiDataScan(data);
    }
  };

  const convertWifiStringToJson = data => {
    let wifiData = `{${data}}`;
    wifiData = wifiData.replace('WIFI:', '"');
    wifiData = wifiData.replace(';;', ';');
    wifiData = wifiData.replace(new RegExp(';', 'g'), '","');
    wifiData = wifiData.replace(new RegExp(':', 'g'), '":"');
    wifiData = wifiData.replace(',"}', '}');
    wifiData = JSON.parse(wifiData);
    return wifiData;
  };

  const connectToWifi = async wifiData => {
    try {
      const ssid = wifiData.S;
      const password = wifiData.P;
      const isWep = wifiData.T.toLowerCase() == 'wep';

      const permissionsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (permissionsGranted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          await WifiManager.connectToProtectedSSID(ssid, password, isWep);
        } catch (error) {
          console.error('Connection failed!', error);
        }

        // WifiManager.getCurrentWifiSSID().then(
        //   ssid => {
        //     console.log("Your current connected wifi SSID is " + ssid);
        //   },
        //   () => {
        //     console.log("Cannot get current SSID!");
        //   }
        // );
      } else {
        console.error('Permission denied');
      }
    } catch (error) {
      console.error('connectToWifi', error);
    }
  };

  const processwifiDataScan = async data => {
    try {
      let wifiData = convertWifiStringToJson(data);
      showWifiScannedAlert(wifiData);
    } catch (error) {
      console.error('processwifiDataScan', error);
    }
  };

  const showWifiScannedAlert = wifiData => {
    setAlertHeading('Scanned Wifi');
    setAlertBody(`SSID: ${wifiData.S}\nSecurity: ${wifiData.T}`);
    setAlertPrimaryButtonText('Connect to Wifi');
    setWifiConnectData(wifiData);
    setAlertPrimaryButtonOnPressType(
      enums.ScannerAlertPrimaryButtonOnPressType.ConnectToWifi,
    );
    setIsOpen(true);
  };

  const toggleFlash = () => {
    if (flashMode == 'flash-off') {
      setFlashMode('flash');
      setScannerFlashMode(RNCamera.Constants.FlashMode.torch);
    } else {
      setFlashMode('flash-off');
      setScannerFlashMode(RNCamera.Constants.FlashMode.off);
    }
  };

  const onAlertClose = () => {
    setIsOpen(false);
    qRCodeScannerRef.current.reactivate();
  };

  const alertPrimaryButtonOnPress = async () => {
    setIsOpen(false);
    setLoading(true);
    if (
      alertPrimaryButtonOnPressType ==
      enums.ScannerAlertPrimaryButtonOnPressType.ConnectToWifi
    ) {
      await connectToWifi(wifiConnectData);
    }
    setLoading(false);
    qRCodeScannerRef.current.reactivate();
  };

  return (
    <Box flex={1}>
      <Modal isOpen={loading}>
        <Modal.Content>
          <Modal.Body>
            <Spinner size="lg" />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <AlertDialog isOpen={isOpen} onClose={onAlertClose} motionPreset={'fade'}>
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            {alertHeading}
          </AlertDialog.Header>
          <AlertDialog.Body>{alertBody}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button colorScheme="secondary" onPress={onAlertClose}>
              Cancel
            </Button>
            <Button
              colorScheme="primary"
              onPress={alertPrimaryButtonOnPress}
              ml={3}>
              {alertPrimaryButtonText}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <QRCodeScanner
        onRead={onScanningSuccess}
        ref={qRCodeScannerRef}
        flashMode={scannerFlashMode}
        showMarker
        topContent={
          <HStack space="lg">
            <Box flex={1} />
            <IconButton
              onPress={toggleFlash}
              variant="ghost"
              icon={
                <Icon size="md" as={MCIcons} name={flashMode} color="black" />
              }
            />
          </HStack>
        }
        bottomContent={
          <Button
            onPress={() => navigation.navigate('Home')}
            startIcon={<Icon size="sm" as={MCIcons} name="collage" />}>
            All Utilities
          </Button>
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
