import React from 'react';
import { useForm } from '@mantine/form';
import SignupData from '../../authentication/SignupData';
import {
  TextInput,
  Button,
  Title,
  Space,
  Text,
  Anchor,
  Alert,
  Card,
  Loader,
  Center,
  Container,
  PasswordInput,
  Group,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from '../../authentication/AuthService';
import { isError, useMutation, useQuery } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { error } from 'console';
import User from '../models/User';
import EditData from './EditData';
import ChangePasswordRequest from './ChangePasswordRequest';

const ChangePasswordPage = () => {
    const user = AuthService.getCurrentUser();
    console.log(user._id);
    const navigate = useNavigate();
    const [dialogOpened, setDialogOpened] = useState(false);
  

    const { mutate: changePassword, isLoading } = useMutation(AuthService.changePassword, {
        onSuccess: () => {
            navigate('/masks');
        },
        onError: () => {},
    });

    const form = useForm<Partial<ChangePasswordRequest>>({
        initialValues: {
          password: '',
          newPassword: '',
        },
    
        validate: {
            password: (value) => (value?.length == null ? 'Enter password' : null),
            newPassword: (value) => (value != null && value.length < 8 ? 'Password must be 8 characters or more' : null),
        },
      });
    
      return (
        <Container style={{ marginTop: '100px' }}>
          <Card shadow="xl" p="md" sx={{ maxWidth: 400 }} mx="auto" withBorder>
            {isLoading ? (
              <Center sx={{ height: '50vh' }}>
                <Loader color="lime" size={80} variant="bars" />
              </Center>
            ) : (
                <form onSubmit={form.onSubmit(() => changePassword(new ChangePasswordRequest({ ...form.values, _id: user._id  })))}>
                <Title order={1}>Slaptažodžio keitimas</Title>
                <Space h="md" />
                <PasswordInput
                  required
                  variant="filled"
                  label="Slaptažodis"
                  placeholder="Slaptažodis"
                  {...form.getInputProps('password')}
                />
                <PasswordInput
                  required
                  variant="filled"
                  label="Naujas slaptažodis"
                  placeholder="Slaptažodis"
                  {...form.getInputProps('newPassword')}
                />
                <Group>
              <Button
                type='submit'
                variant="outline"
                color="lime"
                radius="xl"
                size="md"
                style={{ marginTop: 20 }}
              >
                Pakeisti
              </Button>
              <Button
                variant="outline"
                color="lime"
                radius="xl"
                size="md"
                style={{ marginTop: 20 }}
                onClick={() => {
                  navigate(-1);
                } }
              >
                Atšaukti
              </Button>
            </Group>
                <Space h="md" />
                {/* {isError && (
                  <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                    {error?.response.data.message}
                  </Alert>
                )} */}
              </form>
            )}
          </Card>
        </Container>
      );

};

export default ChangePasswordPage;