import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';
import { FiLogOut } from 'react-icons/fi';
import {
  Button,
  Card,
  Container,
  Group,
  Text,
  ActionIcon,
  MediaQuery,
  Space,
  Burger,
  Stack,
  Anchor,
} from '@mantine/core';
import React, { useState } from 'react';
import { MdOutlineMap, MdOutlineMasks } from 'react-icons/md';
import AuthService from '../../authentication/AuthService';
import { HiQrcode, HiCreditCard } from 'react-icons/hi';

const NavButton = ({
  to,
  color,
  title,
  icon = '',
}: {
  to: string;
  color: string;
  title: string;
  icon?: React.ReactNode;
}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const getActiveColor = (color: string) => {
    if (color === 'green') {
      return 'rgba(235, 251, 238, 1)';
    }
  };

  return (
    <Button
      component={Link}
      to={to}
      variant="subtle"
      color={color}
      size="lg"
      leftIcon={icon}
      style={{ backgroundColor: match ? getActiveColor(color!) : '' }}
    >
      {title}
    </Button>
  );
};

const NavBar = () => {
  const user = AuthService.getCurrentUser();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container className={'navigation-bar'} mx="auto" my={20} px={25}>
        <Card shadow="md" radius="lg" p="md" withBorder>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group position="apart">
              <NavButton to="/masks" color="green" title="Kaukės" icon={<MdOutlineMasks />} />
              <NavButton to="/map" color="green" title="Rūšiavimo taškai" icon={<MdOutlineMap />} />
              <NavButton to="/payment" color="green" title="Mokėjimas" icon={<HiCreditCard />} />
              {!user ? (
                <Group>
                  <NavButton to="/login" color="green" title="Prisijungti" />
                  <NavButton to="/register" color="green" title="Registruotis" />
                </Group>
              ) : (
                <Group>
                  <Button
                    component={Link}
                    to={`/qr/${user._id}`}
                    variant="subtle"
                    color="green"
                    size="lg"
                    leftIcon={<HiQrcode />}
                  >
                    QR
                  </Button>
                  <Anchor component={Link} to={`/user/${user._id}`}>
                    {user.email}
                  </Anchor>
                  <ActionIcon
                    color="green"
                    size="lg"
                    onClick={() => {
                      AuthService.logout();
                      navigate('/');
                    }}
                  >
                    <FiLogOut />
                  </ActionIcon>
                </Group>
              )}
            </Group>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Stack>
              <Group position="apart">
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
                {!user ? (
                  <Group>
                    <NavButton to="/login" color="green" title="Prisijungti" />
                    <NavButton to="/register" color="green" title="Registruotis" />
                  </Group>
                ) : (
                  <Group>
                    <Button
                      component={Link}
                      to={`/qr/${user._id}`}
                      variant="subtle"
                      color="green"
                      size="lg"
                      leftIcon={<HiQrcode />}
                    >
                      QR
                    </Button>
                    <Anchor component={Link} to={`/user/${user._id}`}>
                      {user.email}
                    </Anchor>
                    <ActionIcon
                      color="green"
                      size="lg"
                      onClick={() => {
                        AuthService.logout();
                        navigate('/');
                      }}
                    >
                      <FiLogOut />
                    </ActionIcon>
                  </Group>
                )}
              </Group>
              {opened && (
                <Group>
                  <NavButton to="/masks" color="green" title="Kaukės" icon={<MdOutlineMasks />} />
                  <NavButton to="/map" color="green" title="Rūšiavimo taškai" icon={<MdOutlineMap />} />
                  <NavButton to="/payment" color="green" title="Mokėjimas" icon={<HiCreditCard />} />
                </Group>
              )}
            </Stack>
          </MediaQuery>
        </Card>
      </Container>
    </>
  );
};

export default NavBar;
