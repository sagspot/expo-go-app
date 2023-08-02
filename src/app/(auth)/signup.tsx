import RegisterForm from '@/components/Auth/RegisterForm';
import { Link, Stack } from 'expo-router';
import { Column, Row, ScrollView, Text } from 'native-base';

const SignUpScreen = () => {
  return (
    <ScrollView>
      <Stack.Screen options={{ headerBackVisible: true }} />
      <Column flex={1} paddingY={8} paddingX={6} space={4}>
        <RegisterForm />

        <Row justifyContent="center" space={2}>
          <Text>Have an account already?</Text>
          <Text color="primary.400">
            <Link href="/signin">Login</Link>
          </Text>
        </Row>
      </Column>
    </ScrollView>
  );
};

export default SignUpScreen;
