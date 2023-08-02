import { accountNav } from '@/data/nav';
import { Entypo } from '@expo/vector-icons';
import {
  Container,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

const AccountMenu = () => {
  return (
    <Container w="full" mx="auto" pt={12} pb={8}>
      <VStack w="full" space={2} divider={<Divider />}>
        {accountNav.map(({ icon, href, label }, i) => (
          <Pressable
            onPress={() => console.log("I'm Pressed")}
            key={i}
            _pressed={{ bg: 'gray.200' }}
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              py={4}
              px={2}
            >
              <HStack space={2}>
                <Text>Icon</Text>
                <Text>Label</Text>
              </HStack>

              <Icon as={Entypo} name="chevron-right" />
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Container>
  );
};

export default AccountMenu;
