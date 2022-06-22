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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { MaskType } from '../models/MaskType';
import ImageDropzone from './ImageDropzone';
import { CartContext } from '../../common/context/ShoppingCartContext';
import { CartContextType } from '../../common/models/CartContext';

const MaskEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpened, setDialogOpened] = useState(false);

  const { isLoading: isMaskLoading, data: mask } = useQuery(['mask', id], MaskService.getMask, {
    enabled: !!id,
  });
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { maskUpdated } = useContext(CartContext) as CartContextType;

  const { mutate: saveMask, isLoading } = useMutation(MaskService.saveMask, {
    onSuccess: async (mask) => {
      maskUpdated(new Mask(mask));
      await queryClient.invalidateQueries('masks');
      navigate('/masks');
    },
    onError: () => {},
  });

  const { mutate: deleteProduct, isLoading: isDeleteLoading } = useMutation(MaskService.deleteMask, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('masks');
      navigate('/masks');
    },
    onError: () => {},
  });

  const handleImageAdd = (uploadedFile: File) => {
    setFile(uploadedFile);
  };
  const handleImageRemove = () => {
    setFile(null);
  };

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
            <form
              onSubmit={form.onSubmit(() =>
                saveMask({
                  mask: new Mask({ ...form.values, _id: id, imageUrl: mask?.imageUrl ?? '' }),
                  imageFile: file,
                })
              )}
            >
              <Stack spacing="lg">
                <Title order={2}>{id ? 'Kaukės redagavimas' : 'Nauja kaukė'}</Title>
                <ImageDropzone
                  file={file}
                  savedImageUrl={mask?.imageUrl ?? null}
                  onImageAdd={handleImageAdd}
                  onImageRemove={handleImageRemove}
                />
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
