import { Box } from '@mantine/core';
import React from 'react';
import { GoogleMap } from 'react-google-maps';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import withScriptjs from 'react-google-maps/lib/withScriptjs';

function Map() {
  return <GoogleMap defaultZoom={12} defaultCenter={{ lat: 54.8985, lng: 23.9036 }} />;
}

const { REACT_APP_GOOGLE_KEY } = process.env;

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapComponent() {
  return (
    <Box style={{ width: '80vw', height: '70vh', margin: '0 auto' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Box>
  );
}

// const MapComponent: React.FC<{}> = () => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);
//   return <div ref={ref} />;
// };

// export default MapComponent;
