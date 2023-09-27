// components/Map.tsx
import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'

interface Center {
  name: string
  code: string
  position: { lat: number; lng: number }
}

const Map = () => {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)
  const centers = [
    { name: 'Center 1', code: '123', position: { lat: 23.07218546249878, lng: 72.51500775847575 } },
    { name: 'Center 2', code: '456', position: { lat: 23.042474685781468, lng: 72.63084772338662 } }
  ]

  return (
    <GoogleMap center={centers[0]?.position} zoom={10}>
      {centers?.map(center => (
        <InfoWindow
          options={{ maxWidth: 200 }} // Apply custom styles here
          position={center?.position}
          onCloseClick={() => setSelectedCenter(null)}
        >
          <div
            style={{
              height: '28px',
              width: '48px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <p
              style={{
                fontSize: '10px',
                padding: '0px',
                margin: '0px'
              }}
            >
              {center?.name}
            </p>
          </div>
        </InfoWindow>
      ))}
    </GoogleMap>
  )
}

export default Map
