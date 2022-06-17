import { Group, Text, useMantineTheme, MantineTheme, Image, Center, AspectRatio } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { API_URL } from '../../common/constants';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  file: File | null,
  savedImageUrl: string | null,
  onImageRemove: Function,
  status: DropzoneStatus,
  theme: MantineTheme
) => {
  if (savedImageUrl && !file) {
    return (
      <Center>
        <Image src={`${API_URL}/${savedImageUrl}`} height={220} onClick={() => {}} alt="Norway" />
      </Center>
    );
  }
  if (file) {
    return (
      <Center>
        <Image
          src={URL.createObjectURL(file)}
          onClick={(event) => {
            event.preventDefault();
            onImageRemove();
          }}
          alt="Norway"
          height={220}
        />
      </Center>
    );
  }
  return (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
      <div>
        <Text size="xl" inline>
          Nutempkite paveikslėlį arba paspauskite, kad pasirinkti
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          failas neturėtų būti didesnis nei 5mb
        </Text>
      </div>
    </Group>
  );
};

function ImageDropZone({
  file,
  savedImageUrl,
  onImageAdd,
  onImageRemove,
}: {
  file: File | null;
  savedImageUrl: string | null;
  onImageAdd: Function;
  onImageRemove: Function;
}) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => {
        if (file) {
          console.log('call remove');
          onImageRemove();
        } else onImageAdd(files[0]);
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(file, savedImageUrl, onImageRemove, status, theme)}
    </Dropzone>
  );
}

export default ImageDropZone;
