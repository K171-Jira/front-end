import './MaskBox.scss';
import { Badge, Button, Card, Group, Image, Space, Text, useMantineTheme } from '@mantine/core';
import Mask from '../models/Mask';
import { AuthService } from '../../authentication/services/AuthService';
import { useContext } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';

const MaskBox = ({ mask }: { mask: Mask }) => {
  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.role === 'Admin';
  const theme = useMantineTheme();
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
        <Image src="./mask.jpeg" height={220} alt="Norway" />
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
      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Pridėti į vežimėlį
      </Button>
    </Card>
  );
};

export default MaskBox;
