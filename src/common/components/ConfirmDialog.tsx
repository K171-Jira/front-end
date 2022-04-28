import { Button, Group, Modal, Stack, Text } from '@mantine/core';

const ConfirmDialog = ({
  opened,
  onConfirm,
  onClose,
}: {
  opened: boolean;
  onConfirm: Function;
  onClose: Function;
}) => {
  return (
    <Modal opened={opened} onClose={() => onClose()} title="Ar esate įsitikinęs?">
      <Stack>
        <Text>Bus ištrinti visi šio įrašo duomenys</Text>
        <Group>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Tęsti
          </Button>
          <Button color="gray" onClick={() => onClose()}>
            Atšaukti
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmDialog;
