import React from 'react';
import { Center, Icon, Pressable, Square, Text, VStack } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

function SquareButton(props) {
  return (
    <Pressable
      onPress={props.onPress}
    >
      <Square
        p={4}
        size='xl'
        shadow={2}
        rounded="lg"
      >
        <VStack>
          <Center>
            <Icon as={FAIcon} name={props.iconName} />
          </Center>
          <Center>
            <Text>{props.buttonText}</Text>
          </Center>
        </VStack>
      </Square >
    </Pressable>
  )
}

export default SquareButton;