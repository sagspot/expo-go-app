import { useAuth } from '@/context/auth';
import { Formik } from 'formik';
import { Button, Column, Text } from 'native-base';
import React from 'react';
import * as Yup from 'yup';
import FormikControl from '../Common/Formik/FormikControl';

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('Email/Phone is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{ identifier: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={signIn}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Column space={8}>
          <Column space={4}>
            <Text fontSize={12} fontWeight="500">
              Welcome Back
            </Text>
            <Text fontSize={21} fontWeight="600">
              Login
            </Text>
          </Column>

          <Column space={4}>
            <FormikControl
              control="input"
              name="identifier"
              label="Email/ Phone Number"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="password"
              label="Password"
              type="password"
              variant="underlined"
            />
          </Column>

          <Button onPress={() => handleSubmit()} isLoading={isSubmitting}>
            LOGIN
          </Button>
        </Column>
      )}
    </Formik>
  );
};

export default LoginForm;
