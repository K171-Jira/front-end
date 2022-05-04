import React, { useState, useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MapStyles from './MapStyles';
import { Title, Box, Text } from '@mantine/core';

const maskPointData = [
  {
    address: 'Jeruzalės skg. 11',
    description: '2 rūšiavimo aparatai',
    lat: 54.8986,
    lng: 23.9031,
  },
  {
    address: 'Taikos pr. 32',
    description: '1 rūšiavimo aparatas',
    lat: 54.91119075263983,
    lng: 23.94596620457446,
  },
];

function Map() {
  const [selectedMaskPoint, setSelectedMaskPoint] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedMaskPoint(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 54.8985, lng: 23.9036 }}
      defaultOptions={{ styles: MapStyles }}
    >
      {maskPointData.map((maskPoint) => (
        <Marker
          key={maskPoint.address}
          position={{
            lat: maskPoint.lat,
            lng: maskPoint.lng,
          }}
          onClick={() => {
            setSelectedMaskPoint(maskPoint);
          }}
          icon={{
            url: `https://i.pinimg.com/564x/f9/29/41/f929418accff0354cab083541713904d.jpg`,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedMaskPoint && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMaskPoint(null);
          }}
          position={{
            lat: selectedMaskPoint.lat,
            lng: selectedMaskPoint.lng,
          }}
        >
          <Box>
            <Title order={3}>{selectedMaskPoint.address}</Title>
            <Text color="dimmed" size="lg">
              {selectedMaskPoint.description}
            </Text>
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MaskMap() {
  return (
    <div style={{ width: '80vw', height: '70vh', margin: '0 auto' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
