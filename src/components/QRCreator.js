import {Box, Button, Center, Square, VStack} from 'native-base';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

function QRCreator(props) {
  let qrCodeRef = null;
  let value = ' ';

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

  switch (props.data.type) {
    case 0:
      value = props.data.text;
      break;
    default:
      break;
  }
  console.log({value});
  value = value || ' ';
  return (
    <Center>
      <Center width="70%">
        <QRCode
          getRef={c => (qrCodeRef = c)}
          value={value}
          ecl="H"
          size={200}
        />
        <Button
          onPress={() => qrCodeRef.toDataURL(shareQrCode)}
          width="60%"
          mt={5}>
          Share
        </Button>
      </Center>
    </Center>
  );
}

export default QRCreator;
