import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import {
  GoogleMap, LoadScript, Marker, Circle,
} from '@react-google-maps/api';
import { toSendCoordinat } from '../../redux/actions/actions';
// import { geolocated } from "react-geolocated";

// import TalkPerson from '../TalkPerson/TalkPerson.jsx';

// const MapContainer = () => {
//   const containerStyle = {
//     width: '400px',
//     height: '400px',
//   };

//   // const stateEl = useSelector((state) => state);
//   // const dispatch = useDispatch();
//   // console.log('STATEEL', stateEl);

//   const watch = true;
//   // const {
//   //   latitude,
//   //   longitude,
//   //   timestamp,
//   //   accuracy,
//   //   error,
//   // } = usePosition(watch, { enableHighAccuracy: true });

//   const position = {
//     lat: latitude,
//     lng: longitude,
//   };
//   console.log(position.lat, position.lng, accuracy);

//   const options = {
//     strokeColor: '#5E81AC',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#88C0D0',
//     fillOpacity: 0.2,
//     clickable: true,
//     draggable: false,
//     editable: false,
//     visible: true,
//     radius: 50,
//     zIndex: 1,
//   };

//   const [map, setMap] = useState(null);

//   const onLoad = useCallback((map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback((map) => {
//     setMap(null);
//   }, []);

//   // useEffect(() => {
//   //   dispatch(toSendCoordinat({ latitude, longitude }));
//   // }, [dispatch, latitude, longitude]);

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo"
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={position}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >

//         <Marker
//           position={position}
//         >
//           <Circle
//             radius={100}
//             center={position}
//             options={options}
//             // onClick={} >>> onClickHandler
//             // onMouseOver={} >>> mouseOverHandler
//           />
//         </Marker>

//         {
//           stateEl.forEach((el) => {
//             console.log('el.latitude', el);
//             return (
//               <TalkPerson
//                 lat={el.latitude}
//                 lng={el.longitude}
//                 text={el.userId}
//               />
//             );
//           })
//         }
//         <TalkPerson
//                 lat={59,6}
//                 lng={33.88}
//                 text={'qwerty'}
//               />
//         { /* Child components, such as markers, info windows, etc. */ }

//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapContainer;
// -----------------------------------------------------------

// import React from 'react'
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '400px',
  height: '400px'
};
 
const center = {
  lat: 59.9386300,
  lng: 30.3141300,
};
 
function MapContainer() {
  // console.log('GEOLOCATED', geolocated.props.coords )
  const [map, setMap] = React.useState(null)
  const [ currentPosition, setCurrentPosition ] = useState({});
  
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  console.log('CURRENT_POSITION', currentPosition.lat)
  
  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch, { enableHighAccuracy: true });
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(toSendCoordinat(currentPosition));

  }, [dispatch, currentPosition]);
  
  const stateEl = useSelector((state) => state.locations);
  console.log('STATEEL', stateEl);
  
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        {
          stateEl.map((el) => {
          return  (<Marker text={el.user} key={el.user} position={{lat: Number(el.lat), lng: Number(el.lng)}}
              />)}
          )
        }
         
              
        </>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(MapContainer)
