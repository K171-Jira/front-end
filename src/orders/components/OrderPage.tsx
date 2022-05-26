import { Accordion, AccordionItem, Button, Card, Center, Container, Grid, Group, Loader, Radio, RadioGroup, RangeSlider, Select, Space, Stack, TextInput, Title, Image, Text, useMantineTheme, Badge } from '@mantine/core';
import { AiOutlineFileSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

const order1 = {price:20, amount:5, date:"2020-05-01" };
const mask1 = {brand: "CoolMask", name: "Mask250", amount:3, price:10}
const mask2 = {brand: "MaskMaker", name: "GreatMask", amount:2, price:10}

const order2 = {price:50, amount:3, date:"2020-04-03" };
const mask3 = {brand: "CoolMask", name: "AwesomeMask", amount:1, price:20}
const mask4 = {brand: "CoolMask", name: "Mask400", amount:2, price:30} 


function Orders() {
  const theme = useMantineTheme();
  var newLabel1 = order1.date + " | " + order1.amount + " kaukės | " + order1.price + " €";
  var newLabel2 = order2.date + " | " + order2.amount + " kaukės | " + order2.price + " €";

    return (
      <Container style={{ marginTop: '50px', width: '23%' }}>
        <Title style={{ textAlign: 'center', marginBottom: '20px'}}>Užsakymų istorija</Title>
            <Accordion multiple iconPosition="right" offsetIcon={false}>
              <Accordion.Item label={newLabel1} >     
                <Card 
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
                  <Image src="./mask.jpeg" height={120} alt="Norway" />
                  </Card.Section>
                  <Card.Section style={{ marginLeft: '15px'}}>
                  <Text style={{marginTop: '8px'}} weight={500}>{mask1.name}</Text>
                  <Text size="md" style={{ color: theme.colors.dark[1] }}>
                    {mask1.brand}
                  </Text>
                  </Card.Section>
                  <Space h="xs" />
                  <Card.Section style={{marginRight: '18px'}}>
                    <Text size="md">Kiekis: {mask1.amount}</Text>
                    <Badge style={{ marginBottom: '5px' }} color="green" size="lg" radius="sm" variant="filled">
                      {mask1.price} €
                    </Badge>
                  </Card.Section>
                  </Group>
                </Card>
                <Space h="xs" />
                <Card 
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
                  <Image src="./mask.jpeg" height={120} alt="Norway" />
                  </Card.Section>
                  <Card.Section style={{ marginLeft: '15px'}}>
                  <Text style={{marginTop: '8px'}} weight={500}>{mask2.name}</Text>
                  <Text size="md" style={{ color: theme.colors.dark[1] }}>
                    {mask2.brand}
                  </Text>
                  </Card.Section>
                  <Space h="xs" />
                  <Card.Section style={{marginRight: '18px'}}>
                    <Text size="md">Kiekis: {mask2.amount}</Text>
                    <Badge style={{ marginBottom: '5px' }} color="green" size="lg" radius="sm" variant="filled">
                      {mask2.price} €
                    </Badge>
                  </Card.Section>
                  </Group>
                </Card>
              </Accordion.Item>
              <Accordion.Item label={newLabel2}>
              <Card 
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
                  <Image src="./mask.jpeg" height={120} alt="Norway" />
                  </Card.Section>
                  <Card.Section style={{ marginLeft: '15px'}}>
                  <Text style={{marginTop: '8px'}} weight={500}>{mask3.name}</Text>
                  <Text size="md" style={{ color: theme.colors.dark[1] }}>
                    {mask3.brand}
                  </Text>
                  </Card.Section>
                  <Space h="xs" />
                  <Card.Section style={{marginRight: '18px'}}>
                    <Text size="md">Kiekis: {mask3.amount}</Text>
                    <Badge style={{ marginBottom: '5px' }} color="green" size="lg" radius="sm" variant="filled">
                      {mask3.price} €
                    </Badge>
                  </Card.Section>
                  </Group>
                </Card>
                <Space h="xs" />
                <Card 
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
                  <Image src="./mask.jpeg" height={120} alt="Norway" />
                  </Card.Section>
                  <Card.Section style={{ marginLeft: '15px'}}>
                  <Text style={{marginTop: '8px'}} weight={500}>{mask4.name}</Text>
                  <Text size="md" style={{ color: theme.colors.dark[1] }}>
                    {mask4.brand}
                  </Text>
                  </Card.Section>
                  <Space h="xs" />
                  <Card.Section style={{marginRight: '18px'}}>
                    <Text size="md">Kiekis: {mask4.amount}</Text>
                    <Badge style={{ marginBottom: '5px' }} color="green" size="lg" radius="sm" variant="filled">
                      {mask4.price} €
                    </Badge>
                  </Card.Section>
                  </Group>
                </Card>
                </Accordion.Item>
              </Accordion>
      </Container>
    );
  }
  
  export default Orders;