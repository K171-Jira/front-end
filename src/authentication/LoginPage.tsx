import React from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Title,
  Space,
  Alert,
  PasswordInput,
  Loader,
  Card,
  Container,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from './AuthService';
import { useMutation } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import LoginData from './LoginData';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const form: UseFormReturnType<LoginData> = useForm({
    initialValues: new LoginData({
      email: '',
      password: '',
    }),
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length == null ? 'Enter password' : null),
    },
  });

  const { mutate, isLoading, error, isError } = useMutation(AuthService.login, {
    onSuccess: () => {
      navigate('/masks');
    },
    onError: (err: any) => {},
  });

  return (
    <Container style={{ marginTop: '100px' }}>
      <Card shadow="xl" p="md" style={{ maxWidth: 400 }} mx="auto" withBorder>
        {isLoading ? (
          <Loader color="lime" size={80} variant="bars" />
        ) : (
          <form className="form" onSubmit={form.onSubmit((values: any) => console.log(values))}>
            <Title order={1}>Login</Title>
            <Space h="md" />
            <TextInput
              required
              label="El. paštas"
              placeholder="vardas@puslapis.lt"
              variant="filled"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              required
              label="Slaptažodis"
              placeholder="Slaptažodis"
              variant="filled"
              {...form.getInputProps('password')}
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
            <Space h="md" />
            {isError && (
              <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                {error.response?.data.message}
              </Alert>
            )}
          </form>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
