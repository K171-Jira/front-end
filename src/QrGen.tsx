import { useState } from 'react';
import QRCode from 'react-qr-code';
import { TextInput, Button, Container, Title, Card, Space, Center, Text, Anchor } from '@mantine/core';

function QrGen() {
  const [value, setValue] = useState('');

  return (
    <div>
		<Card shadow="xl" p="md" sx={{ maxWidth: 350, marginTop: 100 }} mx="auto">
			<Title align="center" >QR Demo</Title>
			<Center sx={{ height: '50vh' }}>
			<QRCode value={value} level = 'M' />
			</Center>
			<TextInput value={value} onChange={(event) => setValue(event.target.value)} />
			<Space h="xs" />
			<Container >
			<Button
              variant="outline"
              color="lime"
              radius="xl"
              size="md"
              style={{ marginTop: 20, marginLeft: 100}}
            >
			Grįžti
			</Button>
			</Container>
		</Card>
		
    </div>
  );
}

export default QrGen;