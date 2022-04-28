import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import Mask from '../models/Mask';
import MaskService from '../services/MaskService';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { MaskType } from '../models/MaskType';

const MaskEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = useState(false);

  const { isLoading: isMaskLoading, data: mask } = useQuery(['mask', id], MaskService.getMask, {
    enabled: !!id,
  });

  const { mutate: saveMask, isLoading } = useMutation(MaskService.saveMask, {
    onSuccess: () => {
      navigate('/masks');
    },
    onError: () => {},
  });

  const { mutate: deleteProduct, isLoading: isDeleteLoading } = useMutation(MaskService.deleteMask, {
    onSuccess: () => {
      navigate('/masks');
    },
    onError: () => {},
  });

  const form = useForm<Partial<Mask>>({
    initialValues: {
      name: '',
      brand: '',
      amount: 0,
      price: 0,
      type: MaskType.threeply,
    },
  });

  useEffect(() => {
    form.setValues({
      name: mask?.name,
      brand: mask?.brand,
      amount: mask?.amount,
      price: mask?.price,
      type: mask?.type,
    });
  }, [mask]);

  const handleProductDelete = () => {
    setDialogOpened(true);
  };

  return (
    <>
      <Container size="sm" px="xl" style={{ marginTop: '50px' }}>
        <Card shadow="sm" style={{ padding: '32px' }}>
          {isLoading || isMaskLoading || isDeleteLoading ? (
            <Center>
              <Loader size="xl" variant="dots" />
            </Center>
          ) : (
            <form onSubmit={form.onSubmit(() => saveMask(new Mask({ ...form.values, _id: id })))}>
              <Stack spacing="lg">
                <Title order={2}>{id ? 'Update Mask' : 'New Mask'}</Title>
                <TextInput
                  variant="default"
                  placeholder="Pavadinimas"
                  label="Pavadinimas"
                  required
                  {...form.getInputProps('name')}
                />
                <TextInput
                  variant="default"
                  placeholder="Brendas"
                  label="Brendas"
                  {...form.getInputProps('brand')}
                />
                <Select
                  label="Tipas"
                  placeholder="Pasirinkite vieną"
                  data={[
                    { value: MaskType.threeply, label: 'Trisluoksnė' },
                    { value: MaskType.KN95, label: 'KN95' },
                  ]}
                  {...form.getInputProps('type')}
                />
                <NumberInput
                  variant="default"
                  placeholder="Kiekis"
                  label="Kiekis"
                  min={0}
                  required
                  {...form.getInputProps('amount')}
                />
                <NumberInput
                  variant="default"
                  placeholder="Kaina"
                  label="Kaina"
                  precision={2}
                  min={0}
                  required
                  {...form.getInputProps('price')}
                />
                <Group>
                  <Button type="submit">Išsaugoti</Button>
                  <Button color="gray" onClick={() => navigate(-1)}>
                    Atšaukti
                  </Button>
                  {id && (
                    <Button color="red" onClick={() => handleProductDelete()} leftIcon={<AiOutlineDelete />}>
                      Ištrinti
                    </Button>
                  )}
                </Group>
              </Stack>
            </form>
          )}
        </Card>
      </Container>
      <ConfirmDialog
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onConfirm={() => {
          deleteProduct(id!);
        }}
      />
    </>
  );
};

export default MaskEdit;
