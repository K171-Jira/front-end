import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';
import { FiLogOut } from 'react-icons/fi';
import {
  Button,
  Card,
  Container,
  Group,
  useMantineTheme,
  Text,
  ActionIcon,
  MediaQuery,
  Space,
} from '@mantine/core';
import React from 'react';
import { MdOutlineMasks } from 'react-icons/md';
import AuthService from '../../authentication/AuthService';
import { HiQrcode } from 'react-icons/hi';

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
  const navigate = useNavigate();
  return (
    <>
      <Container mx="auto" my={20} px={25}>
        <Card shadow="md" radius="lg" p="md" withBorder>
          <Group position="apart">
            <NavButton to="/masks" color="green" title="Kaukės" icon={<MdOutlineMasks />} />
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
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                  <Space h="lg" />
                </MediaQuery>
                <Text size="xs">{user.email}</Text>
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
        </Card>
      </Container>
    </>
  );
};

export default NavBar;
