// import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import { Button, Container, Group, Progress, Stack, Text, Title, Affix, Transition } from '@mantine/core';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import Geocode from 'react-geocode';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';
import { useWindowScroll } from '@mantine/hooks';

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: '1',
};

const LandingPage = () => {
  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.role === 'Admin';
  const queryClient = useQueryClient();
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Container style={containerStyle}>
        <Title
          //stilyze the title
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            // make the letters in the title gradient
            //textShadow: '2px 2px 4px #235C1D',
            color: '#40c057',
            textAlign: 'center',
            marginTop: '5rem',
            marginBottom: '2rem',
            fontFamily: 'Segoe UI',
          }}
        >
          Sveiki atvykę į Masketplace
        </Title>
      </Container>
      {/* <Group>
          <Title>Welcome to our recycling points map</Title>
          <Text>
            This is a map of all recycling points in Lithuania. If you have any questions or suggestions,
            please contact us.
          </Text>
          <Text>
            You can add your own recycling point! Just click on the plus button and fill in the form.
          </Text>
          <Text>If you are an admin, you can delete any recycling point you want.</Text>
          <Text>If you have any questions, please contact us!</Text>
          <Text>You can find our contact information in the footer.</Text>
        </Group> */}
    </>
  );
};

export default LandingPage;
