import AccountMenu from '@/components/Account/AccountMenu';
import AccountProfileCard from '@/components/Account/AccountProfileCard';
import { useAuth } from '@/context/auth';
import { Button, Divider, ScrollView } from 'native-base';
import React from 'react';

const AccountScreen = () => {
  const { signOut } = useAuth();
  return (
    <ScrollView bg="gray.50" pb={12}>
      <AccountProfileCard />
      <AccountMenu />
      <Divider minW="full" h="1" />
      <Button variant="ghost" colorScheme="red" rounded="lg" onPress={signOut}>
        Sign Out
      </Button>
    </ScrollView>
  );
};

export default AccountScreen;
