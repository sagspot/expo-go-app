import { useAuth } from '@/context/auth';
import { Avatar, Text, VStack, View } from 'native-base';
import React from 'react';

const AccountProfileCard = () => {
  const { session } = useAuth();

  return (
    <VStack>
      <View
        bg="gray.200"
        borderBottomRadius="3xl"
        h={32}
        w="full"
        position="relative"
      />

      <VStack alignItems="center" space={4}>
        <Avatar
          size="xl"
          borderWidth={2}
          borderColor="white"
          bg="gray.400"
          source={{ uri: session?.user.image }}
          mt={-10}
        >
          {session?.user.name
            .split(' ')
            .map((name) => name.substring(0, 1))
            .join('')}
        </Avatar>

        <VStack space={1}>
          <Text fontWeight="semibold" fontSize={16} maxW={40}>
            {session?.user.name}
          </Text>
          <Text fontSize={13}>{session?.user.phone}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default AccountProfileCard;
