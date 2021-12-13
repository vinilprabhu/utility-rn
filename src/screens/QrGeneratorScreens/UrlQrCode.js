import {Center, Input, VStack} from 'native-base';
import React, {useState} from 'react';
import QRCreator from '../../components/QRCreator';

export const UrlQrCode = () => {
  const [text, setText] = useState('');

  const onTextChange = textInput => {
    textInput =
      textInput.toLowerCase().startsWith('http://') ||
      textInput.toLowerCase().startsWith('https://')
        ? textInput
        : `http://${textInput}`;
    setText(textInput);
  };

  return (
    <VStack m={2}>
      <Center m={2}>
        <Input placeholder="Add url here" w="70%" onChangeText={onTextChange} />
      </Center>
      <QRCreator
        data={{
          text,
          type: 0,
        }}
      />
    </VStack>
  );
};
