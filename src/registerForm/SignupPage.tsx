import React from 'react';
import { useForm } from '@mantine/form';
import SignupData from './SignupData';
import { TextInput, Button, Box, Title, Space, Text, Anchor, Alert } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from './AuthService';
import { useMutation, useQueryClient } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import CustomLoader from '../common/CustomLoader';

const SignupPage = () => {
  const queryClient = useQueryClient();
  const form: UseFormReturnType<SignupData> = useForm({
    initialValues: new SignupData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      termsOfService: false,
    }),
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must be 8 characters or more' : null),
      confirmPassword: (value) => (value !== form.values.password ? 'Passwords must match' : null),
      firstName: (value) => (value.length < 2 ? 'First name must be 2 characters or more' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must be 2 characters or more' : null),
    },
  });

  const { mutate, isLoading, error, isError } = useMutation(AuthService.signup, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'User Registered Successfully';
      alert(message);
    },
    onError: (err: any) => {},
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  return (
    <div className="form-content-right">
      <form className="form" onSubmit={form.onSubmit((values: any) => console.log(values))}>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <Title order={1}>Sign up</Title>
          <TextInput
            required
            label="El. paštas"
            placeholder="vardas@puslapis.lt"
            {...form.getInputProps('email')}
          />
          <TextInput
            required
            label="Slaptažodis"
            placeholder="Slaptažodis"
            {...form.getInputProps('password')}
          />
          <TextInput
            required
            label="Patvirtinti slaptažodį"
            placeholder="Slaptažodis"
            {...form.getInputProps('confirmPassword')}
          />
          <TextInput required label="Vardas" placeholder="Vardas" {...form.getInputProps('firstName')} />
          <TextInput required label="Pavardė" placeholder="Pavardė" {...form.getInputProps('lastName')} />
          <Button
            variant="outline"
            color="lime"
            radius="xl"
            size="md"
            style={{ marginTop: 20 }}
            onClick={() => {
              mutate(form.values);
            }}
          >
            Prisijungti
          </Button>
          <Space h="xs" />
          <Text>
            Jau turite paskyrą ? Prisijunkite <Anchor href="/users/login">čia</Anchor>
          </Text>
          <Space h="xs" />
          {isLoading && <CustomLoader />}
          <Space h="xs" />
          {isError && (
            <Alert icon={<FiAlertTriangle />} title="Šventi kopūstai!" color="red" radius="md">
              {error.response?.data.message}
            </Alert>
          )}
        </Box>
      </form>
    </div>
  );
};
export default SignupPage;
