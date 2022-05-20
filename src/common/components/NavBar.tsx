import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';
import { FiLogOut } from 'react-icons/fi';
import {
  Button,
  Text,
  Card,
  Container,
  Group,
  ActionIcon,
  MediaQuery,
  Burger,
  Stack,
  Anchor,
  Menu,
  Avatar,
  Divider,
  MantineSize,
} from '@mantine/core';
import React, { useContext, useState } from 'react';
import { MdOutlineMap, MdOutlineMasks } from 'react-icons/md';
import { HiQrcode, HiCreditCard } from 'react-icons/hi';
import { UserContextType } from '../../authentication/models/User';
import { AuthContext } from '../../authentication/context/AuthContext';
import { AiFillCaretDown, AiOutlineEdit, AiOutlineCreditCard } from 'react-icons/ai';

const NavButton = ({
  to,
  color,
  title,
  icon = '',
  size = 'lg',
}: {
  to: string;
  color: string;
  title: string;
  icon?: React.ReactNode;
  size?: MantineSize;
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
      size={size}
      leftIcon={icon}
      style={{ backgroundColor: match ? getActiveColor(color!) : '' }}
    >
      {title}
    </Button>
  );
};

const NavHoverMenu = ({ user, logout, buttonSize = 'lg', avatarSize = 'md' }: any) => {
  const navigate = useNavigate();

  return (
    <Menu
      control={
        <Button color="green" size={buttonSize} variant="subtle">
          <Group>
            <Avatar size={avatarSize} color="cyan" radius="xl">
              {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
            </Avatar>
            Balansas: {user.balance.toString()}
            <AiFillCaretDown size={'10px'} />
          </Group>
        </Button>
      }
    >
      <Menu.Label>{user.email}</Menu.Label>
      <Menu.Item
        icon={<AiOutlineCreditCard />}
        onClick={() => {
          navigate('/payment');
        }}
      >
        {' '}
        Papildyti balansą
      </Menu.Item>
      <Menu.Item
        icon={<AiOutlineEdit />}
        onClick={() => {
          navigate(`/user/${user._id}`);
        }}
      >
        {' '}
        Redaguoti paskyrą
      </Menu.Item>
      <Divider />
      <Menu.Item
        color={'red'}
        icon={<FiLogOut />}
        onClick={() => {
          logout();
        }}
      >
        {' '}
        Atsijungti
      </Menu.Item>
    </Menu>
  );
};

const NavBar = () => {
  const { user, logout } = useContext(AuthContext) as UserContextType;
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
                  {/*<Anchor component={Link} to={`/user/${user._id}`}>*/}
                  {/*  {user.email}*/}
                  {/*</Anchor>*/}
                  {/*<ActionIcon*/}
                  {/*  color="green"*/}
                  {/*  size="lg"*/}
                  {/*  onClick={() => {*/}
                  {/*    logout();*/}
                  {/*    navigate('/');*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <FiLogOut />*/}
                  {/*</ActionIcon>*/}
                  <NavHoverMenu user={user} logout={logout} />
                </Group>
              )}
            </Group>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Stack>
              <Group position="apart">
                <Burger size={'xs'} opened={opened} onClick={() => setOpened((o) => !o)} />
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
                      size="sm"
                      leftIcon={<HiQrcode />}
                    >
                      QR
                    </Button>
                    {/*<Anchor component={Link} to={`/user/${user._id}`}>*/}
                    {/*  {user.email}*/}
                    {/*</Anchor>*/}
                    {/*<ActionIcon*/}
                    {/*  color="green"*/}
                    {/*  size="lg"*/}
                    {/*  onClick={() => {*/}
                    {/*    logout();*/}
                    {/*    navigate('/');*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <FiLogOut />*/}
                    {/*</ActionIcon>*/}
                    <NavHoverMenu avatarSize={'sm'} buttonSize={'sm'} user={user} logout={logout} />
                  </Group>
                )}
              </Group>
              {opened && (
                <Group>
                  <NavButton size={'sm'} to="/masks" color="green" title="Kaukės" icon={<MdOutlineMasks />} />
                  <NavButton
                    size={'sm'}
                    to="/map"
                    color="green"
                    title="Rūšiavimo taškai"
                    icon={<MdOutlineMap />}
                  />
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
