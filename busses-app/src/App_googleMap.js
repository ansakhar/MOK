import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function App() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDXhyQT8WcqbeD_FtjeM6OYW2DGj8sBwDU"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

//export default React.memo(MyComponent)
export default App;