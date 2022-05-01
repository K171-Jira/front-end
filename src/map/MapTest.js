import React, { useState, useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MapStyles from './MapStyles';

const parkData = [
  {
    address: 'Kažkur savanoriuose',
    description: '2 rūšiavimo aparatai',
    lat: 54.8986,
    lng: 23.9031,
  },
  {
    address: 'Lelija mano',
    description: '1 rūšiavimo aparatas',
    lat: 54.8998,
    lng: 23.904,
  },
];

function Map() {
  const [selectedPark, setSelectedMaskPoint] = useState(null);

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
      //defaultOptions={{ styles: MapStyles }}
    >
      {parkData.map((maskPoint) => (
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

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMaskPoint(null);
          }}
          position={{
            lat: selectedPark.lat,
            lng: selectedPark.lng,
          }}
        >
          <div>
            <h2>{selectedPark.address}</h2>
            <p>{selectedPark.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapTest() {
  console.log(parkData);
  console.table(parkData);
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
