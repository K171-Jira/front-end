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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { error } from 'console';
import User from '../models/User';
import EditData from './EditData';


const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = useState(false);

  const { isLoading: isUserLoading, data: user } = useQuery(['user', id], AuthService.getCurrentUser, {
    enabled: !!id,
  });

  const { mutate: saveUser, isLoading } = useMutation(AuthService.saveUser, {
    onSuccess: () => {
      navigate('/masks');
    },
    onError: () => {},
  });

  const form: UseFormReturnType<EditData> = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstName: (value) => (value.length < 2 ? 'First name must be 2 characters or more' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must be 2 characters or more' : null),
    },
  });

  useEffect(() => {
    form.setValues({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }, [user]);

  // const handlePasswordChange = () => {
  //   setDialogOpened(true);
  // };
      
  return (
    <><Container style={{ marginTop: '100px' }}>
      <Card shadow="xl" p="md" sx={{ maxWidth: 400 }} mx="auto" withBorder>
        {isLoading ? (
          <Center sx={{ height: '50vh' }}>
            <Loader color="lime" size={80} variant="bars" />
          </Center>
        ) : (
          <form onSubmit={form.onSubmit(() => saveUser(new User({ ...form.values, _id: id })))}>
            <Title order={1}>Keisti paskyros duomenis</Title>
            <Space h="md" />
            <TextInput
              required
              variant="filled"
              label="El. paštas"
              placeholder="vardas@puslapis.lt"
              {...form.getInputProps('email')} />
            <TextInput
              required
              variant="filled"
              label="Vardas"
              placeholder="Vardas"
              {...form.getInputProps('firstName')} />
            <TextInput
              required
              variant="filled"
              label="Pavardė"
              placeholder="Pavardė"
              {...form.getInputProps('lastName')} />
            <Group>
            <Space h="xs" />
            <Button component={Link} to={`/user/changePassword/`} color="gray" style={{ marginTop: 20, marginLeft: -14 }} >Pakeisti slaptažodį </Button>
            <Space h="md" />
              <Button
                type='submit'
                variant="outline"
                color="lime"
                radius="xl"
                size="md"
                style={{ marginTop: 20 }}
              >
                Atnaujinti duomenis
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
            {/* {isError && (
              <Alert icon={<FiAlertTriangle />} title="Kažkas nepavyko!" color="red" radius="md">
                {error?.response.data.message}
              </Alert>
            )} */}
          </form>
        )}
      </Card>
    </Container>
    {/* <ConfirmDialog
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onConfirm={() => {
          changePassword(id!);
        } } />c */}
    </>
  );
};

export default EditPage;
