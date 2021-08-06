import React, { useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Pressable, Text } from 'native-base';
import { Linking, PermissionsAndroid, StyleSheet } from 'react-native';
import WifiManager from "react-native-wifi-reborn";

export const QrScanner = () => {
  onSuccess = e => {
    const data = e.data;
    console.log({ data });
    if (data.startsWith("BEGIN:VCARD") || data.startsWith("MECARD:"))
      console.log("contact", data);
    else if (data.toLowerCase().startsWith("http://") || data.toLowerCase().startsWith("https://"))
      console.log("url", data);
    else if (data.toLowerCase().startsWith("mailto:"))
      console.log("email", data);
    else if (data.toLowerCase().startsWith("matmsg:"))
      console.log("email with data", data);
    else if (data.toLowerCase().startsWith("smsto:"))
      console.log("sms", data);
    else if (data.toLowerCase().startsWith("wifi:"))
      processwifiDataScan(data);
  };

  const convertWifiStringToJson = (data) => {
    let wifidata = `{${data}}`
    console.log({ wifidata });
    wifidata = wifidata.replace('WIFI:', '\"');
    wifidata = wifidata.replace(';;', ';');
    console.log({ wifidata });
    wifidata = wifidata.replace(new RegExp(';', 'g'), '\",\"');
    console.log({ wifidata });
    wifidata = wifidata.replace(new RegExp(':', 'g'), '\":\"');
    console.log({ wifidata });
    wifidata = wifidata.replace(',\"}', '}');
    console.log({ wifidata });
    wifidata = JSON.parse(wifidata);
    console.log({ wifidata });
    return wifidata;
  }

  const connectToWifi = async (wifidata) => {
    try {
      const ssid = wifidata.S;
      const password = wifidata.P;
      const isWep = wifidata.T.toLowerCase() == "wep";
      const isOpen = (wifidata.T.toLowerCase() == "nopass") || !password;

      console.log({ ssid, password, isWep, isOpen });

      const permissionsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message: 'This app needs location permission as this is required to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (permissionsGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissions GRANTED");
        try {
          // if (isOpen)
          //   await WifiManager.connectToSSID(ssid);
          // else
            await WifiManager.connectToProtectedSSID(ssid, password, isWep);
          console.log("Connected successfully!");
        } catch (error) {
          console.error("Connection failed!", error);
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
        console.error("Permission denied");
      }
    } catch (error) {
      console.error("connectToWifi", error);
    }
  }

  const processwifiDataScan = async (data) => {
    try {
      let wifidata = convertWifiStringToJson(data);
      console.log({ wifidata });
      connectToWifi(wifidata);
    } catch (error) {
      console.error("processwifiDataScan", error);
    }
  }

  const qRCodeScannerRef = useRef("qRCodeScannerRef");

  return (
    <QRCodeScanner
      onRead={onSuccess}
      ref={qRCodeScannerRef}
      flashMode={RNCamera.Constants.FlashMode.off}
      showMarker
      topContent={
        <Text style={styles.centerText}>
          Go to{' '}
          <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
          your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <Pressable style={styles.buttonTouchable} onPress={() => qRCodeScannerRef.current.reactivate()}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </Pressable >
      }
    />
  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});