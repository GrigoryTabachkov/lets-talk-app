import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import {
  GoogleMap, LoadScript, Marker, Circle,
} from '@react-google-maps/api';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { toSendCoordinat } from '../../redux/actions/actions';
import UserList from '../UserList/UserLIst.jsx';
import Context from '../../context/Context';
import Chart from '../Chart/Chart.jsx';

const containerStyle = {
  width: '60vw',
  height: '60vh',
  borderRadius: '10px',
  boxShadow: '',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: '#5E81AC',
    backgroundColor: '#A3BE8C',
  },
}));

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

function MapContainer({ data }) {
  const classes = useStyles();

  const watch = true;
  const {
    latitude,
    longitude,
    accuracy,
  } = usePosition(watch, {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true,
  });
  console.log('Accuracy: ', accuracy);

  const dispatch = useDispatch();

  useEffect(() => {
    // setInterval(() => {
    dispatch(toSendCoordinat({ lat: latitude, lng: longitude }));
    // }, 1000);
  }, [dispatch, latitude, longitude]);

  const state = useSelector((state) => state);
  const stateEl = state.locations;
  const stateUsers = state.users;

  const [stateMap, setStateMap] = useState([]);
  const [userChoose, setUserChoose] = useState('');

  useEffect(() => {
    setStateMap(stateEl);
  }, [stateEl]);

  // const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };

  return (
    <div
      className="mapAndList"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >

      <Context.Provider value={{
        userChoose,
        setUserChoose,
        setStateMap,
      }}
      >
        <LoadScript
          googleMapsApiKey="AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo"
        >
          <div
            className="chartContainer"
            style={{
              backgroundColor: 'rgba(216, 222, 233, 0.5)',
              borderRadius: '10px',
              zIndex: 1,
            }}
          >
            <Button
              className={classes.button}
              onClick={() => {
                setStateMap(stateEl);
                setUserChoose('');
              }}
            >
              Full list
            </Button>
            <UserList list={stateUsers} />
            <Chart user={data} />
          </div>

          <div id="map">
            <GoogleMap
          // onLoad={onLoad}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={11}
            >

              {stateMap.map((el) => (
                <Marker
                  text={el.user}
                  key={el.user + Math.floor(Math.random() * 10000)}
                  position={{ lat: Number(el.lat), lng: Number(el.lng) }}
                >
                  <Circle
                    radius={100}
                    center={{ lat: Number(el.lat), lng: Number(el.lng) }}
                    options={options}
                  />
                  {/* <InfoBox */}
                  {/*  options={infoBoxOptions} */}
                  {/*  position={{ lat: Number(el.lat), lng: Number(el.lng) }} */}
                  {/* > */}
                  {/*  <div style={{ backgroundColor: 'green', opacity: 0.55, padding: 12 }}> */}
                  {/*    <div style={{ fontSize: 12, fontColor: '#08233B' }}> */}
                  {/*      Имя: */}
                  {/*      {el.userName} */}
                  {/*    </div> */}
                  {/*  </div> */}
                  {/* </InfoBox> */}
                </Marker>
              ))}
            </GoogleMap>
          </div>

        </LoadScript>
      </Context.Provider>
    </div>
  );
}

export default React.memo(MapContainer);
