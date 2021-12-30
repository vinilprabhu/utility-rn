import {Center, Input, VStack} from 'native-base';
import React, {useState} from 'react';
import QRCreator from '../../components/QRCreator';

export const TextQrCode = () => {
  const [text, setText] = useState('');

  const onTextChange = textInput => setText(textInput);

  return (
    <VStack m={2}>
      <Center m={5} mb={10}>
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
