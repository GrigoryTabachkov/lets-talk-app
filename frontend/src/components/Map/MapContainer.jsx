import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import GoogleMapReact from 'google-map-react';
import { toSendCoordinat } from '../../redux/actions/actions';
import TalkPerson from '../TalkPerson/TalkPerson.jsx';

const MapContainer = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [defaultMapState] = useState(defaultProps);
  const stateEl = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('STATEEL', stateEl);

  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch);
  console.log(longitude)

  useEffect(() => {
    dispatch(toSendCoordinat({latitude, longitude}));
  }, [dispatch, latitude, longitude]);
  return (
  // Important! Always set the container height explicitly
    <div style={{ margin: '10px', height: '400px', width: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo' }}
        defaultCenter={defaultMapState.center}
        defaultZoom={defaultMapState.zoom}
      >
        {
          stateEl.map((el) => {
            console.log(el.latitude)
            return <TalkPerson
              lat={el.latitude}
              lng={el.longitude}
              text="{el.userId}"
            />
          }
            
          )
        }

      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
