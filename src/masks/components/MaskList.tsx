import { useNavigate } from 'react-router-dom';
import MaskBox from './MaskBox';
import { Button, Center, Container, Grid, Group, Loader, TextInput } from '@mantine/core';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery, useQueryClient } from 'react-query';
import MaskService from '../services/MaskService';
import Mask from '../models/Mask';
import AuthService from '../../authentication/AuthService';
import { SetStateAction, useState } from 'react';

const MaskList = () => {
  
  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('masks')

  const [inputText, setInputText] = useState("");
  let inputHandler = (e: any) => {
    setInputText(e.target.value);
  };


  const navigate = useNavigate();
  const { isLoading, data: masks } = useQuery(['masks', inputText], MaskService.getMasks, { enabled: true }); 

  
  const userIsAdmin = AuthService.getCurrentUser()?.role === 'Admin';

  return (
    <><Container style={{paddingBottom: '30px' }} size="xs" px="xs">
      <TextInput
        placeholder="Pavadinimas"
        label="Kaukės paieška"
        onChange={inputHandler} />
    </Container>
    <div>
        {userIsAdmin && (
          <Container style={{ paddingTop: '25px', paddingBottom: '25px' }}>
            <Group position="center">
              <Button
                leftIcon={<AiOutlinePlusCircle />}
                radius="md"
                size="lg"
                onClick={() => {
                  navigate('add');
                } }
              >
                Pridėti kaukę
              </Button>
            </Group>
          </Container>
        )}
        {isLoading ? (
          <Loader size="xl" variant="dots" />
        ) : (
          <Grid gutter="xl" justify="center" align="center">
            {masks instanceof Array && masks.map((mask: any, index: number) => (
              <Grid.Col key={index} md={6} lg={3}>
                <Center>
                  <MaskBox mask={new Mask(mask)} />
                </Center>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div></>
  );
};

export default MaskList;
