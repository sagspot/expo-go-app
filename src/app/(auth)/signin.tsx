import LoginForm from '@/components/Auth/LoginForm';
import { Link, Stack } from 'expo-router';
import { Column, Row, ScrollView, Text } from 'native-base';
import React from 'react';

const SignInScreen = () => {
  return (
    <ScrollView>
      <Stack.Screen options={{ headerBackVisible: true }} />
      <Column flex={1} paddingY={8} paddingX={6} space={4}>
        <LoginForm />

        <Row justifyContent="center" space={2}>
          <Text>Don't have an account?</Text>
          <Text color="primary.400">
            <Link href="/signup">Create an account</Link>
          </Text>
        </Row>
      </Column>
    </ScrollView>
  );
};

export default SignInScreen;
