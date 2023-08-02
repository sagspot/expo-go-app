import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';
import React from 'react';

interface Props {
  message: string;
  status: InterfaceAlertProps['status'];
}

const ErrorLabel = ({ message, status }: Props) => {
  return (
    <Alert w="100%" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {message}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600',
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default ErrorLabel;
