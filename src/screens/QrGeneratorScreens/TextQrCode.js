import {Center, Input, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import QRCreator from '../../components/QRCreator';
import colors from '../../constants/colors';

export const TextQrCode = () => {
  const [text, setText] = useState('');

  const onTextChange = textInput => setText(textInput);

  return (
    <VStack m={2}>
      <Center m={2}>
        <Input
          placeholder="Add text here"
          w="70%"
          onChangeText={onTextChange}
        />
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
