// components/MyMap.tsx
import React from 'react'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import Map from '../MapContainer/index'
const MapWrapper = ({ DATA, setSelectedCenter, selectedCenter }: any) => {
  const containerElementStyle = {
    height: '500px'
  }

  const mapElementStyle = {
    height: '100%'
  }

  const loadingElement = <div style={{ height: '100%' }}>Loading...</div>

  const WrappedMapComponent = withScriptjs(
    withGoogleMap(() => <Map DATA={DATA} setSelectedCenter={setSelectedCenter} selectedCenter={selectedCenter} />)
  )
  console.log('DATADATADATA', DATA)
  return (
    <div style={containerElementStyle}>
      <WrappedMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${'AIzaSyBvp7N2PUcwwJyClscyZqOnoYnsmOQdryA'}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={loadingElement}
        containerElement={<div style={containerElementStyle} />} // Add this line
        mapElement={<div style={mapElementStyle} />} // Add this line
      />
    </div>
  )
}

export default MapWrapper
