import { Center } from '@mantine/core';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

const QRPage = () => {
  let { id } = useParams();
  return (
    <Center style={{ marginTop: 100 }}>
      <QRCode value={id!} />
    </Center>
  );
};

export default QRPage;
