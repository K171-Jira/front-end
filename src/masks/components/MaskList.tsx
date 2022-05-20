import { useNavigate } from 'react-router-dom';
import MaskBox from './MaskBox';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Radio,
  RadioGroup,
  RangeSlider,
  Select,
  Space,
  TextInput,
} from '@mantine/core';
import { AiOutlineFileSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import MaskService from '../services/MaskService';
import Mask from '../models/Mask';
import { SetStateAction, useContext, useState } from 'react';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import Filters from './Filters';
import { MaskType } from '../models/MaskType';
import SearchOptions from './SearchOptions';
import { FiSearch } from 'react-icons/fi';

const MaskList = () => {
  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('masks')

  const [textQuery, setTextQuery] = useState('');
  let textQueryHandler = (e: any) => {
    setTextQuery(e.target.value);
  };

  const [filters, setFilters] = useState<Filters>({
    type: MaskType.threeply,
    brand: '',
    amount: null,
    priceFloor: null,
    priceCeiling: null,
  });

  let filterHandler = (e: any) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(100);

  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.role === 'Admin';
  const { isLoading, data: masks } = useQuery(
    ['masks', new SearchOptions(textQuery, filters)],
    MaskService.getMasks,
    {
      enabled: true,

      onSuccess: (masks) => {
        // setMinPrice(Math.min(masks.map((mask: { price: number; }) => mask.price)));
        // setMaxPrice(Math.max(masks.map((mask: { price: number; }) => mask.price)));
      },
    }
  );

  return (
    <>
      <div>
        <Container style={{ paddingBottom: '30px', paddingTop: '30px' }} size={270} px="xs">
          <TextInput
            icon={<FiSearch size={25} />}
            size="lg"
            placeholder="Pavadinimas"
            onChange={textQueryHandler}
          />
        </Container>

        <Container style={{ paddingBottom: '30px' }} size={270} px="xs">
          <Accordion>
            <Accordion.Item label="Filtras">
              <Card p="lg">
                <form id="create-course-form">
                  <TextInput
                    label="Brendas"
                    placeholder="Brendas"
                    name="brand"
                    value={filters.brand}
                    onChange={filterHandler}
                  />
                  <Space h="md" />
                  <TextInput
                    label="Kiekis"
                    placeholder="Kiekis"
                    name="amount"
                    value={filters.amount ?? ''}
                    onChange={filterHandler}
                  />
                  <Space h="md" />

                  {/* <RangeSlider
              label='Kaina'

              min={minPrice}
              max={maxPrice}

              defaultValue={[minPrice, maxPrice]}

              value={[filters.priceFloor, filters.priceCeiling]}

              onChange={(e) => {
                console.log(
                setFilters({
                  ...filters,
                  priceFloor: e[0],
                  priceCeiling: e[1]
                }));
              }}

              marks = {[
                { value: minPrice, label: minPrice.toString() },
                { value: maxPrice, label: maxPrice.toString() },
              ]}

            /> */}

                  <div style={{ display: 'flex' }}>
                    <TextInput
                      label="Kaina nuo"
                      placeholder="Kaina nuo"
                      name="priceFloor"
                      value={filters.priceFloor ?? ''}
                      onChange={filterHandler}
                    />
                    <Space w="sm" />
                    <TextInput
                      label="iki"
                      placeholder="Kaina iki"
                      name="priceCeiling"
                      value={filters.priceCeiling ?? ''}
                      onChange={filterHandler}
                    />
                  </div>
                  <Space h="md" />
                  <Select
                    label="Tipas"
                    placeholder="Tipas"
                    name="type"
                    value={filters.type}
                    onChange={(value) => filterHandler({ target: { name: 'type', value: value } })}
                    data={[
                      { value: MaskType.threeply, label: 'Trisluoksnė' },
                      { value: MaskType.KN95, label: 'KN95' },
                    ]}
                  />
                </form>
              </Card>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
      <div>
        {userIsAdmin && (
          <Container style={{ paddingTop: '25px', paddingBottom: '25px' }} size={270}>
            <Group position="center">
              <Button
                leftIcon={<AiOutlinePlusCircle />}
                radius="md"
                size="lg"
                onClick={() => {
                  navigate('add');
                }}
              >
                Pridėti kaukę
              </Button>
            </Group>
          </Container>
        )}
        {isLoading ? (
          <Center>
            <Loader size="xl" variant="dots" />
          </Center>
        ) : (
          <Grid gutter="xl" justify="center" align="center">
            {masks instanceof Array &&
              masks.map((mask: any, index: number) => (
                <Grid.Col key={index} md={6} lg={3}>
                  <Center>
                    <MaskBox mask={new Mask(mask)} />
                  </Center>
                </Grid.Col>
              ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default MaskList;
