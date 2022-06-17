import './MaskBox.scss';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  NumberInput,
  NumberInputHandlers,
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core';
import Mask from '../models/Mask';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import { CartContext } from '../../common/context/ShoppingCartContext';
import { CartContextType, ICartItem } from '../../common/models/CartContext';
import { API_URL } from '../../common/constants';

const MaskBox = ({ mask }: { mask: Mask }) => {
  const { user } = useContext(AuthContext) as UserContextType;
  const [amount, setAmount] = useState(0);
  const { items, addItem } = useContext(CartContext) as CartContextType;
  const handlers = useRef<NumberInputHandlers>();
  const userIsAdmin = user?.role === 'Admin';
  const theme = useMantineTheme();

  const getMaxAmount = () => {
    const maskIndex = items.findIndex((item) => item.mask.id === mask.id);
    if (maskIndex != -1) {
      return mask.amount - items[maskIndex].amount;
    }
    return mask.amount;
  };
  return (
    <Card
      className="product-card"
      shadow="sm"
      p="xl"
      style={{
        minWidth: 350,
      }}
      component={userIsAdmin ? 'a' : 'div'}
      href={userIsAdmin ? `/masks/${mask.id}` : ''}
      withBorder
    >
      <Card.Section>
        <Image radius="sm" height={220} src={mask.imageUrl ? `${API_URL}/${mask.imageUrl}` : './mask.jpeg'} />
      </Card.Section>
      <Space h="xs" />
      <Group position="apart">
        <Text weight={500}>{mask.name}</Text>
        {mask.amount > 0 ? (
          <Badge color="green" variant="light">
            Yra
          </Badge>
        ) : (
          <Badge color="pink" variant="light">
            Neturime
          </Badge>
        )}
      </Group>
      <Space h={5} />
      <Text size="md" style={{ color: theme.colors.dark[1] }}>
        {mask.brand}
      </Text>
      <Space h="xs" />
      <Group position="apart">
        <Text size="md">Likęs kiekis: {mask.amount}</Text>
        <Badge color="green" size="lg" radius="sm" variant="filled">
          €{mask.price}
        </Badge>
      </Group>
      <Space h="xs" />
      <Text>Pirkti</Text>
      <Group spacing={5}>
        <ActionIcon
          size={36}
          variant="default"
          onClick={(e: any) => {
            e.preventDefault();
            handlers.current?.decrement();
          }}
        >
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={amount}
          onChange={(val) => setAmount(val ?? 0)}
          handlersRef={handlers}
          min={0}
          max={getMaxAmount()}
          onClick={(event: any) => {
            event.preventDefault();
          }}
          styles={{ input: { width: 54, textAlign: 'center' } }}
        />
        <ActionIcon
          size={36}
          variant="default"
          onClick={(e: any) => {
            e.preventDefault();
            handlers.current?.increment();
          }}
        >
          +
        </ActionIcon>
      </Group>

      <Button
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
        onClick={(event: any) => {
          event.preventDefault();
          if (amount == 0) return;
          addItem({ mask: mask, amount: amount, price: mask.price * amount });
        }}
      >
        Pridėti į krepšelį
      </Button>
    </Card>
  );
};

export default MaskBox;
