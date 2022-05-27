import React, { useCallback, useContext, useState } from 'react';
import {
  Button,
  Container,
  Group,
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
  Affix,
  Transition,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';
import { useWindowScroll } from '@mantine/hooks';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { RiSurgicalMaskFill } from 'react-icons/ri';
import NavBar from '../common/components/NavBar';
import { AiOutlinePhone } from 'react-icons/ai';

const containerStyle = {
  width: '100%',
  height: 'auto',
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
            style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              color: '#40c057',
              textAlign: 'left',
              marginBottom: '2rem',
              fontFamily: 'Segoe UI',
            }}
          >
            Masketplace idėja yra rūšiavimas, tačiau šis rūšiavimas turi būti smagus visiems, todėl šis
            projektas ir atsirado. Kaukės yra perkamos, panaudotos kaukės yra rūšiuojamos, rūšiuotos kaukės
            yra švariai perdirbamos, o perdirbtos kaukės atsiranda mūsų kataloge. Tai sudaro pilną ratą, mes
            tikimės, kad labai maža tų kaukių dalis atsiras gatvių ir namų šiukšliadėžėse.
          </Text>
          <Divider my="sm" />
          <Image
            src="https://www.westernslopenow.com/wp-content/uploads/sites/95/2021/05/GlobalRecyclingDay-2019.jpg"
            style={{
              margin: 'auto',
              maxWidth: '50%',
              maxHeight: '50%',
              boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          />
          <Space h="xl" />
          <Divider my="sm" />
          <Text
            component="span"
            align="center"
            size="xl"
            weight={400}
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
          <Text
            component="span"
            align="center"
            size="xl"
            weight={400}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            color="dimmed"
          >
            Daugelis žmonių meta šiukšles bet kur ir bet kaip, kad tik jų atsikratyti, tačiau nė nesusivokia,
            kad joms priskiriant tam tikras vietas tausotume ir savo pinigus ir savo aplinką.
          </Text>
          <Space h="xl" />
          <Divider my="sm" />
          <Text
            style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              color: '#40c057',
              textAlign: 'left',
              marginBottom: '2rem',
              fontFamily: 'Segoe UI',
            }}
          >
            Mūsų svetainių ir rūšiavimo mašinų dizainas yra draugiškas akims, todėl net ir su technologijomis
            nedraugaujantys žmonės tikrai mokės naudotis mūsų sistema. Savo paskyroje rasite QR kodą, kuris
            yra naudojamas prisijungimui prie rūšiavimo mašinos. Kuomet jūsų nusipirktos kaukės nusidėvės, jas
            galėsite nusinešti prie rūšiavimo mašinos ir priduoti taip gaudami taškus į savo sistemą.
            Svetainės žemėlapyje taip pat galima rasti visas rūšiavimo mašinas, galite matyti ar apsimoka į
            jas važiuoti priklausomai nuo to kiek daug jos yra užpildytos.
          </Text>
          <Blockquote cite="– Peter F. Hamilton">
            Societies only have waste products while acquiring fresh raw material remains a cheaper option
            than recycling.
          </Blockquote>
          <Divider my="sm" />
        </Container>
      </Card>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          leftIcon={<AiOutlinePhone />}
          //onClick={() => }
        >
          Susisiekite su mumis
        </Button>
      </Affix>
    </>
  );
};

export default LandingPage;
