import {
  Button,
  Popover,
  Text,
  MantineSize,
  ActionIcon,
  Stack,
  Group,
  Image,
  Badge,
  Divider,
  Indicator,
} from '@mantine/core';
import React, { useContext, useState } from 'react';
import { AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { UserContextType } from '../../authentication/models/User';
import { CartContext } from '../context/ShoppingCartContext';
import { CartContextType } from '../models/CartContext';
import { API_URL } from '../constants';
import OrderItem from '../../orders/models/OrderItem';
import { useMutation } from 'react-query';
import { AuthContext } from '../../authentication/context/AuthContext';
import Order from '../../orders/models/Order';
import { OrderService } from '../../orders/services/OrderService';


const ShoppingCart = ({ buttonSize }: { buttonSize: MantineSize }) => {
  const [opened, setOpened] = useState(false);
  const { items, removeItem } = useContext(CartContext) as CartContextType;

  const { user } = useContext(AuthContext) as UserContextType;

  var orderItems = items.map(item => new OrderItem(item.mask.id, item.amount, item.price))

  const { mutate, isLoading, error, isError } = useMutation(OrderService.addOrder, {
    onSuccess:() => {
      setOpened(false);
    },
    onError: () => {},
  });
  

  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <Indicator size={18} label={items.length}>
            <ActionIcon
              size={buttonSize}
              color="green"
              radius="md"
              variant="filled"
              onClick={() => setOpened((o) => !o)}
            >
              <AiOutlineShoppingCart size={16} />
            </ActionIcon>
          </Indicator>
        }
        width={350}
        position="bottom"
        withArrow
      >
        <>
          {items.length === 0 ? (
            <Text size="lg">Kol kas neturite jokių pirkinių</Text>
          ) : (
            <Stack spacing={8}>
              {items.map((item, index) => (
                <Group position={'apart'}>
                  <Group>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => {
                        removeItem(index);
                      }}
                    >
                      <AiOutlineDelete />
                    </ActionIcon>
                    <Image
                      src={item.mask.imageUrl ? `${API_URL}/${item.mask.imageUrl}` : './mask.jpeg'}
                      height={50}
                      alt="Norway"
                    />
                    <Stack spacing={0}>
                      <Text size={'sm'}>{item.mask.name}</Text>
                      <Text size={'xs'} color="dimmed">
                        {item.mask.brand}
                      </Text>
                    </Stack>
                  </Group>
                  <Stack spacing={0} align={'end'}>
                    <Text size={'sm'}>Kiekis: {item.amount}</Text>
                    <Badge color="green" size="lg" radius="sm" variant="filled">
                      {item.mask.price}
                    </Badge>
                  </Stack>
                </Group>
              ))}
              {items.length > 1 && (
                <>
                  <Divider my="sm" />
                  <Text>
                    Viso:
                    {' ' +
                      items
                        .reduce((accumulator, object) => {
                          return accumulator + object.price;
                        }, 0)
                        .toFixed(2)}
                  </Text>
                </>
              )}
              <Button variant="light" color="blue" fullWidth onClick={() => mutate(new Order({userId: user?._id, items: orderItems }))}>
                Apmokėjimas
              </Button>
            </Stack>
          )}
        </>
      </Popover>
    </>
  );
};

export default ShoppingCart;
