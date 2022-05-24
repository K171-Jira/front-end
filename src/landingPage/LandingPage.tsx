// import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import {
  Button,
  Container,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  Image,
  BackgroundImage,
  Accordion,
  ThemeIcon,
  Space,
  Blockquote,
  Card,
  Divider,
} from '@mantine/core';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import Geocode from 'react-geocode';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';
import { useWindowScroll } from '@mantine/hooks';
// import AiOutlineQuestionCircle
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { RiSurgicalMaskFill } from 'react-icons/ri';
import NavBar from '../common/components/NavBar';

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
      <img
        src="https://cdn.wallpapersafari.com/3/80/tZ8Kle.jpg"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: '-10',
          marginTop: '-20px',
          // make only the background image stay in place while scrolling and everything else work like normal
          //transform: `translateY(${scroll.y}px)`,
        }}
      ></img>
      <NavBar />
      <Card
        shadow="md"
        radius="lg"
        p="md"
        withBorder
        style={{
          width: '60%',
          margin: 'auto',
          marginBottom: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Container style={containerStyle}>
          <Title
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
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
          <Divider my="sm" />
          <Text
            component="span"
            align="center"
            //variant="gradient"
            //gradient={{ from: '#40c057', to: 'cyan', deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            color="dimmed"
          >
            Didėjant kaukių poreikiui daugėja ir atliekų. Masketplace buvo įkurtas, kad išspręsti dvi
            problemas vienu metu.
          </Text>
          <Space h="xl" />
          <Accordion disableIconRotation>
            <Accordion.Item
              label="Kodėl rinktis mus ?"
              icon={
                <ThemeIcon color="green" variant="light">
                  <AiOutlineQuestionCircle />
                </ThemeIcon>
              }
            >
              Vieninteliai Europoje kaukių rūšiavimo srityje, patikimiausia sistema, naujausi rūšiavimo
              aparatai ir galimybė nusipirkti naujas ir prašmatnias kaukes internetu.
            </Accordion.Item>

            <Accordion.Item
              label="Juk kaukes galiu nusipirkti įprastai vaistinėje"
              icon={
                <ThemeIcon color="blue" variant="light">
                  <FiShoppingBag />
                </ThemeIcon>
              }
            >
              Taip, galite, tačiau su mumis galite jas ir rūšiuoti, o už rūšiavimą gaunate taškus savo
              paskyroje, kuriuos galima naudoti naujų kaukių pirkimui.
            </Accordion.Item>
            <Accordion.Item
              label="Kodėl rušiuoti kaukes ?"
              icon={
                <ThemeIcon color="red" variant="light">
                  <RiSurgicalMaskFill />
                </ThemeIcon>
              }
            >
              Kaukių rūšiavimas nėra labai plačiai paplitęs, dauguma žmonių kaukes meta į šiukšliadėžes
              nežinodami, kad jas galima perdirbti, o dabar tam yra specialios vietos.
            </Accordion.Item>
          </Accordion>
          <Space h="xl" />
          <Text
            component="span"
            align="center"
            //variant="gradient"
            //gradient={{ from: 'cyan', to: '#40c057', deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            color="dimmed"
          >
            Daugelis žmonių meta šiukšles bet kur ir bet kaip, kad tik jų atsikratyti, tačiau nė nesusivokia,
            kad joms priskiriant tam tikras vietas tausotume ir savo pinigus ir savo aplinką.
          </Text>

          <Space h="xl" />
          <Divider my="sm" />
          <Blockquote cite="– Peter F. Hamilton">
            Societies only have waste products while acquiring fresh raw material remains a cheaper option
            than recycling.
          </Blockquote>
          <Divider my="sm" />
        </Container>
      </Card>
    </>
  );
};

export default LandingPage;
