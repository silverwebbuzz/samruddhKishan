// components/Map.tsx
import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllUsers } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'

interface Center {
  name: string
  code: string
  position: { lat: number; lng: number }
}

const Map = (DATA: any) => {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const centers = [
    { name: 'Center 1', code: '123', position: { lat: 23.07218546249878, lng: 72.51500775847575 } },
    { name: 'Center 2', code: '456', position: { lat: 23.042474685781468, lng: 72.63084772338662 } }
  ]

  const filteredUniqueArray = DATA?.DATA?.filter((item, index, self) => {
    return item.roleId === 13
  }).reduce((uniqueArray, currentItem) => {
    if (!uniqueArray.some(item => item.id === currentItem.id)) {
      uniqueArray.push(currentItem)
    }
    return uniqueArray
  }, [])
  return (
    <GoogleMap
      center={{ lat: Number(filteredUniqueArray?.[0]?.lat), lng: Number(filteredUniqueArray?.[0]?.lng) }}
      zoom={10}
    >
      {filteredUniqueArray?.map((center: any) => (
        // <InfoWindow
        //   options={{ width: 'auto' }} // Apply custom styles here
        //   position={{ lat: Number(center?.lat), lng: Number(center?.lng) }}
        //   // onCloseClick={() => setSelectedCenter(null)}
        // >
        //   <div
        //     style={{
        //       height: '28px',
        //       width: '48px',
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: 'center'
        //     }}
        //   >
        //     <p
        //       style={{
        //         fontSize: '10px',
        //         padding: '0px',
        //         margin: '0px'
        //       }}
        //     >
        //       {center?.centerName}
        //     </p>
        //   </div>
        <InfoWindow
          options={{ width: 'auto' }} // Apply custom styles here
          position={{ lat: Number(center?.lat), lng: Number(center?.lng) }}
        >
          {/* Apply custom CSS styles */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 'auto', // Set to 'auto' to adjust width based on content
              padding: '10px', // Adjust padding as needed
              background: 'white', // Set background color
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Apply shadow if desired
              borderRadius: '4px' // Apply border radius if desired
            }}
          >
            <p
              style={{
                fontSize: '14px', // Adjust font size as needed
                margin: '0px'
              }}
            >
              {center?.centerName}
            </p>
          </div>
        </InfoWindow>
        // </InfoWindow>
      ))}
    </GoogleMap>
  )
}

export default Map
