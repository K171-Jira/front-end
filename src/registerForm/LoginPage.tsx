import React from 'react';
import { useForm } from '@mantine/form';
import SignupData from './SignupData';
import { TextInput, Button, Box, Title, Space, Text, Anchor, Alert, PasswordInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from './AuthService';
import { useMutation, useQueryClient } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import CustomLoader from '../common/CustomLoader';
import LoginData from './LoginData';

const LoginPage = () => {
    const queryClient = useQueryClient();
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
        onSuccess: (data) => {
        },
        onError: (err: any) => {},
    });

    return (
        <div className="form-content-right">
          <form className="form" onSubmit={form.onSubmit((values: any) => console.log(values))}>
            <Box sx={{ maxWidth: 300 }} mx="auto">
              <Title order={1}>Login</Title>
              <TextInput
                required
                label="El. paštas"
                placeholder="vardas@puslapis.lt"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                required
                label="Slaptažodis"
                placeholder="Slaptažodis"
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

export default LoginPage;

