import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import {
  GoogleMap, LoadScript, Marker, Circle,
} from '@react-google-maps/api';
import { toSendCoordinat } from '../../redux/actions/actions';
import UserList from '../UserList/UserLIst';
import Context from '../../context/Context';
import Chart from '../Chart/Chart';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 59.9386300,
  lng: 30.3141300,
};

function MapContainer({ data }) {
  // console.log('GEOLOCATED', geolocated.props.coords )
  const [map, setMap] = React.useState(null);
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });
  console.log('CURRENT_POSITION', currentPosition.lat);

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
    dispatch(toSendCoordinat({ lat: latitude, lng: longitude }));
  }, [latitude]);

  const state = useSelector((state) => state);
  const stateEl = state.locations;
  const stateUsers = state.users;
  console.log('STATEEL', state);
  const [stateMap, setStateMap] = useState([]);
  const [userChoose, setUserChoose] = useState('');
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
    <>
    <Context.Provider value={{
      userChoose,
      setUserChoose,
      setStateMap,
    }}>
      <div>
      <button onClick={() => { setStateMap(stateEl); }}>Full list</button>
    <UserList list={stateUsers} />
    <Chart user={data}/>
      </div>
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
          stateMap.map((el) => (<Marker key={el.user} position={{ lat: Number(el.lat), lng: Number(el.lng) }}
          />))
        }

        </>
      </GoogleMap>
    </LoadScript>
    </Context.Provider>
    </>
  );
}

export default React.memo(MapContainer);
