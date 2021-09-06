import React from 'react';
import { Box, HStack, Icon, Text } from 'native-base';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function IconToast(props) {
  return (
    <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
      <HStack>
        <Icon as={MCIcons} name={props.iconName} size='xs' mr={2} />
        <Text>{props.toastText}</Text>
      </HStack>
    </Box>
  )
}

export default IconToast;