// // components/Map.tsx
// import React, { useEffect, useState } from 'react'
// import { GoogleMap, InfoWindow } from 'react-google-maps'

// const Map = (DATA: any) => {
//   return (
//     <GoogleMap center={{ lat: Number(DATA?.DATA?.[0]?.lat), lng: Number(DATA?.DATA?.[0]?.lng) }} zoom={10}>
//       {DATA?.DATA?.map((center: any) => (
//         <InfoWindow
//           options={{ minWidth: '300px' }} // Apply custom styles here
//           position={{ lat: Number(center?.lat), lng: Number(center?.lng) }}
//         >
//           <div>
//             <p
//               style={{
//                 fontSize: '14px', // Adjust font size as needed
//                 margin: '0px'
//               }}
//             >
//               {center?.count}
//             </p>
//           </div>
//         </InfoWindow>
//       ))}
//     </GoogleMap>
//   )
// }

// export default Map

// // components/Map.tsx
// import React, { useEffect, useState } from 'react'
// import { GoogleMap, InfoWindow } from 'react-google-maps'

// const Map = ({ DATA, setSelectedCenter }: any) => {
//   const infoWindowStyle = {
//     padding: '10px',
//     borderRadius: '5px',
//     fontSize: '14px',
//     margin: '0px',
//     display: 'flex',
//     background: 'green'
//   }
//   return (
//     <GoogleMap center={{ lat: Number(DATA?.[0]?.lat), lng: Number(DATA?.[0]?.lng) }} zoom={10}>
//       {DATA?.map((center: any) => (
//         <InfoWindow position={{ lat: Number(center?.lat), lng: Number(center?.lng) }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'flex',
//               cursor: 'pointer'
//             }}
//             onClick={e => {
//               e.preventDefault()
//               setSelectedCenter(center?.city)
//             }}
//           >
//             <div style={infoWindowStyle}>{center?.count}</div>
//             <div>{center?.centerName}</div>
//           </div>
//         </InfoWindow>
//       ))}
//     </GoogleMap>
//   )
// }

// export default Map

import React, { useEffect } from "react";
import { GoogleMap, InfoWindow } from "react-google-maps";
import { useDispatch } from "react-redux";
import { getCenterCount } from "src/slice/centerSlice";
import { AppDispatch } from "src/store/store";

const Map = ({ DATA, setSelectedCenter }: any) => {
  const infoWindowStyle = {
    padding: "12px",
    borderRadius: "5px",
    fontSize: "14px",
    margin: "0px",
    display: "flex",
    background: "#f7c35f",
  };
  return (
    <GoogleMap
      center={{
        lat: Number(23.04536648340735),
        lng: Number(72.56671999989858),
      }}
      zoom={10}
    >
      {DATA?.map((center: any) => (
        <InfoWindow
          position={{ lat: Number(center?.lat), lng: Number(center?.lng) }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up
              setSelectedCenter(center?.city);
            }}
          >
            <div style={infoWindowStyle}>
              <h3 style={{ margin: "0 0" }}>{center?.count}</h3>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <h3>{center?.city}</h3>
            </div>
          </div>
        </InfoWindow>
      ))}
    </GoogleMap>
  );
};

export default Map;
