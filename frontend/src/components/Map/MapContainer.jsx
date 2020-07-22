import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import {
  GoogleMap, LoadScript, Marker, Circle,
} from '@react-google-maps/api';
import { toSendCoordinat } from '../../redux/actions/actions';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 59.9386300,
  lng: 30.3141300,
};

const options = {
  strokeColor: '#5E81AC',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#88C0D0',
  fillOpacity: 0.1,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 50,
  // mapTypeControl: false,
  // navigationControl: false,
};

function MapContainer() {
  // console.log('GEOLOCATED', geolocated.props.coords )
  const [map, setMap] = React.useState(null);

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
    setInterval(() => {
      dispatch(toSendCoordinat({ lat: latitude, lng: longitude }));
    }, 1000);
  }, [dispatch, latitude, longitude]);

  const stateEl = useSelector((state) => state.locations);
  console.log('STATEEL', stateEl);

  const [stateMap, setStateMap] = useState([]);

  useEffect(() => {
    setStateMap(stateEl);
  }, [stateEl]);

  console.log('stateMap', stateMap);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo"
    >
      <div id="map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {
          stateMap.map((el) => (
            <Marker
              text={el.user}
              key={el.user + Math.floor(Math.random() * 1000)}
              position={{ lat: Number(el.lat), lng: Number(el.lng) }}
            >
              <Circle
                radius={100}
                center={{ lat: Number(el.lat), lng: Number(el.lng) }}
                options={options}
              />
            </Marker>
          ))
        }

        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
