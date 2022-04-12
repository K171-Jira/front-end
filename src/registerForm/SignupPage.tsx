import React from 'react';
import { useForm } from '@mantine/form';
import SignupData from './SignupData';
import {
  TextInput,
  Button,
  Box,
  Title,
  Space,
  Text,
  Anchor,
  Alert,
  Card,
  Loader,
  Center,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from './AuthService';
import { useMutation, useQueryClient } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import '../common/Loader.scss';

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
        {isLoading ? (
          <Card shadow="xl" p="md" sx={{ maxWidth: 350, height: '56vh', marginTop: 100 }} mx="auto">
            <Center sx={{ height: '50vh' }}>
              <Loader sx={{}} color="lime" size={80} variant="bars" />
            </Center>
          </Card>
        ) : (
          <Card shadow="xl" p="md" sx={{ maxWidth: 350, marginTop: 100 }} mx="auto">
            <Title order={1}>Registracija</Title>
            <Space h="xs" />
            <TextInput
              required
              variant="filled"
              label="El. paštas"
              placeholder="vardas@puslapis.lt"
              {...form.getInputProps('email')}
            />
            <TextInput
              required
              variant="filled"
              label="Slaptažodis"
              placeholder="Slaptažodis"
              {...form.getInputProps('password')}
            />
            <TextInput
              required
              variant="filled"
              label="Patvirtinti slaptažodį"
              placeholder="Slaptažodis"
              {...form.getInputProps('confirmPassword')}
            />
            <TextInput
              required
              variant="filled"
              label="Vardas"
              placeholder="Vardas"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              required
              variant="filled"
              label="Pavardė"
              placeholder="Pavardė"
              {...form.getInputProps('lastName')}
            />
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
            <Space h="xs" />
            {isError && (
              <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                {error.response?.data.message}
              </Alert>
            )}
          </Card>
        )}
      </form>
    </div>
  );
};
export default SignupPage;
