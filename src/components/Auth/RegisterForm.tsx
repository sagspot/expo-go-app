import { useAuth } from '@/context/auth';
import { passwordRegex, telRegex } from '@/utils/constants';
import { Formik } from 'formik';
import { Button, Column, Text } from 'native-base';
import React from 'react';
import * as Yup from 'yup';
import FormikControl from '../Common/Formik/FormikControl';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(telRegex, 'Invalid phone number')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain at least one number, one uppercase, one lowercase, and one special case character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const { signUp } = useAuth();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={signUp}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Column space={8}>
          <Text fontSize={21} fontWeight="600">
            Create your Account
          </Text>

          <Column space={4}>
            <FormikControl
              control="input"
              name="firstName"
              label="First Name"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="lastName"
              label="Last Name"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="phone"
              label="Phone Number"
              keyboardType="phone-pad"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="email"
              label="Email Address"
              keyboardType="email-address"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="password"
              type="password"
              label="Password"
              variant="underlined"
            />
            <FormikControl
              control="input"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="underlined"
            />
          </Column>

          <Button onPress={() => handleSubmit()} isLoading={isSubmitting}>
            REGISTER
          </Button>
        </Column>
      )}
    </Formik>
  );
};

export default RegisterForm;
