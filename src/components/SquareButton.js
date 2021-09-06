import React from 'react';
import { Center, Icon, Pressable, Square, Text, VStack } from 'native-base';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SquareButton(props) {
  return (
    <Pressable
      m={4}
      onPress={props.onPress}
    >
      <Square
        p={4}
        size={props.size ? props.size : 'xl'}
        shadow={2}
        rounded="lg"
      >
        <VStack>
          <Center>
            <Icon as={MCIcons} name={props.iconName} />
          </Center>
          <Center mt={2}>
            <Text>{props.buttonText}</Text>
          </Center>
        </VStack>
      </Square >
    </Pressable>
  )
}

export default SquareButton;