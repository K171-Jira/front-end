import { Accordion, AccordionItem, Button, Card, Center, Container, Grid, Group, Loader, Radio, RadioGroup, RangeSlider, Select, Space, Stack, TextInput, Title, Image, Text, useMantineTheme, Badge } from '@mantine/core';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';
import { API_URL } from '../../common/constants';
import SearchOptions from '../../masks/components/SearchOptions';
import MaskService from '../../masks/services/MaskService';
import { OrderService } from '../services/OrderService';

function Orders() {
    const theme = useMantineTheme();

    const { user } = useContext(AuthContext) as UserContextType;

    const { data: masks } = useQuery(
        ['masks', new SearchOptions()],
        MaskService.getMasks,
        {
          enabled: true,
    
          onSuccess: (masks) => {},
        }
    );

    const { data: orders } = useQuery(
        ['orders', user?._id],
        OrderService.getOrders,
        {
            enabled: true,

            onSuccess: (orders) => {},
        }
    );


    return (
        <Container style={{ marginTop: '50px', width: '23%' }}>
        <Title style={{ textAlign: 'center', marginBottom: '20px'}}>Užsakymų istorija</Title>
        
                <Accordion multiple iconPosition="right" offsetIcon={false}>
                {orders.map(
                    (order: any) => (
                        <Accordion.Item label='Užsakymas' >

                        {order.items.map((item: any) => {
                            <><Card
                                shadow="lg"
                                p="x1"
                                style={{
                                    minWidth: 350,
                                    marginTop: '10px',
                                }}
                                withBorder
                            >
                                <Group position="apart">
                                    <Card.Section>
                                        <Image src={masks.find((mask: { _id: any; }) => mask._id === item.maskId).imageUrl ? `${API_URL}/${masks.find((mask: { _id: any; }) => mask._id === item.maskId).imageUrl}` : './mask.jpeg'} height={120} alt="Norway" />
                                    </Card.Section>
                                    <Card.Section style={{ marginLeft: '15px' }}>
                                        <Text style={{ marginTop: '8px' }} weight={500}>{masks.find((mask: { _id: any; }) => mask._id === item.maskId).name}</Text>
                                        <Text size="md" style={{ color: theme.colors.dark[1] }}>
                                            {masks.find((mask: { _id: any; }) => mask._id === item.maskId).brand}
                                        </Text>
                                    </Card.Section>
                                    <Space h="xs" />
                                    <Card.Section style={{ marginRight: '18px' }}>
                                        <Text size="md">Kiekis: {item.amount}</Text>
                                        <Badge style={{ marginBottom: '5px' }} color="green" size="lg" radius="sm" variant="filled">
                                            {item.price} €
                                        </Badge>
                                    </Card.Section>
                                </Group>
                            </Card><Space h="xs" /></>
                        })}

                        </Accordion.Item>
                    )
                )}
                </Accordion>

        </Container>
    );
}


export default Orders;