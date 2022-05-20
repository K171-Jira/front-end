import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import NavBar from '../common/components/NavBar';
import { Button, Container, Group, Progress, Stack, Text, Title } from '@mantine/core';
import RecyclingPoint from './models/RecyclingPoint';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import RecyclingPointService from './services/RecyclingPointService';
import Geocode from 'react-geocode';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: '1',
};

const center = {
  lat: 54.8986,
  lng: 23.9031,
};

const PointsMap = () => {
  const { user } = useContext(AuthContext) as UserContextType;
  const userIsAdmin = user?.role === 'Admin';
  const queryClient = useQueryClient();
  const { data: points } = useQuery('points', RecyclingPointService.getPoints);
  const { mutate: savePoint } = useMutation(RecyclingPointService.savePoint, {
    onSuccess: () => {
      queryClient.invalidateQueries('points');
    },
    onError: () => {},
  });
  const { mutate: deletePoint } = useMutation(RecyclingPointService.deletePoint, {
    onSuccess: () => {
      queryClient.invalidateQueries('points');
      setSelectedPoint(null);
    },
    onError: () => {},
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || '',
  });
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY || '');

  const [map, setMap] = useState<any>(null);
  const [markerSvg, setMarkerSvg] = useState<google.maps.Icon>({ url: '' });
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [isAddMode, setAddMode] = useState<boolean>(false);

  const onLoad = useCallback(function callback(map) {
    setMarkerSvg({
      url: './recycling-point.svg',
      scaledSize: new google.maps.Size(80, 80),
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const initializeAddMode = () => {
    setAddMode(true);
    map?.setOptions({
      draggableCursor: 'copy',
    });
  };

  const onMapClick = async (event: google.maps.MapMouseEvent) => {
    if (isAddMode) {
      const address =
        (await Geocode.fromLatLng(event.latLng?.lat().toString() || '', event.latLng?.lng().toString() || ''))
          .results[0].formatted_address || '';
      const addressParts = address.split(',');
      const shortAddress = addressParts[0];
      savePoint(
        new RecyclingPoint({ lat: event.latLng?.lat(), lng: event.latLng?.lng(), address: shortAddress })
      );
      map?.setOptions({
        draggableCursor: 'grab',
      });
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={isAddMode ? 'custom-cursor' : ''}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onClick={(event) => onMapClick(event)}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <NavBar />
      {userIsAdmin && (
        <Container style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <Group position="center">
            <Button
              leftIcon={<AiOutlinePlusCircle />}
              radius="md"
              size="lg"
              onClick={() => {
                initializeAddMode();
              }}
            >
              Pridėti tašką
            </Button>
          </Group>
        </Container>
      )}
      {points?.map(
        (point: RecyclingPoint, index: number) =>
          point.lat &&
          point.lng && (
            <Marker
              icon={markerSvg}
              key={index}
              position={{
                lat: point.lat,
                lng: point.lng,
              }}
              onClick={() => {
                setSelectedPoint(point);
              }}
            />
          )
      )}
      {selectedPoint && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPoint(null);
          }}
          anchor={
            new google.maps.Marker({
              position: { lat: selectedPoint.lat, lng: selectedPoint.lng },
              anchorPoint: new google.maps.Point(0, -70),
            })
          }
          position={{
            lat: selectedPoint.lat,
            lng: selectedPoint.lng,
          }}
        >
          <Container style={{ height: userIsAdmin ? '140px' : '100px' }}>
            <Stack spacing="xs">
              <Title order={3}>{selectedPoint.address}</Title>
              <Group spacing="xs">
                <Stack spacing={0}>
                  <Title order={4}>Surūšiuota kaukių</Title>
                  <Text size="md">{selectedPoint.filledCapacity + '/' + selectedPoint.maxCapacity}</Text>
                </Stack>
                <Progress
                  style={{ transform: 'rotate(-90deg)', width: '50px' }}
                  color="green"
                  size="xl"
                  value={(selectedPoint.filledCapacity! / selectedPoint.maxCapacity!) * 100}
                  animate
                />
              </Group>
              {userIsAdmin && (
                <Button
                  color="red"
                  radius="md"
                  size="xs"
                  onClick={() => {
                    deletePoint(selectedPoint._id);
                  }}
                >
                  Pašalinti
                </Button>
              )}
            </Stack>
          </Container>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default PointsMap;
