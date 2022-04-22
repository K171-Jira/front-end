import { useNavigate } from 'react-router-dom';
import MaskBox from './MaskBox';
import { Button, Center, Container, Grid, Group, Loader } from '@mantine/core';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import MaskService from '../services/MaskService';
import Mask from '../models/Mask';
import AuthService from '../../authentication/AuthService';

const MaskList = () => {
  const navigate = useNavigate();
  const { isLoading, data: masks } = useQuery('masks', MaskService.getMasks);
  const userIsAdmin = AuthService.getCurrentUser()?.role === 'Admin';

  return (
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
              }}
            >
              Add New
            </Button>
          </Group>
        </Container>
      )}
      {isLoading ? (
        <Loader size="xl" variant="dots" />
      ) : (
        <Grid gutter="xl" justify="center" align="center">
          {masks.map((mask: any, index: number) => (
            <Grid.Col key={index} md={6} lg={3}>
              <Center>
                <MaskBox mask={new Mask(mask)} />
              </Center>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MaskList;
