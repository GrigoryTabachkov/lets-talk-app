import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

const Map = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [defaultMapState] = useState(defaultProps);

  const { userName, x, y } = useSelector((state) => ({
    userName: state.userName,
    x: state.x,
    y: state.y,
  }));

  // const Marker = () => {
  //   return <div className="pin">{userName}</div>;
  // };

  const renderMarkers = (map, maps) => new maps.Marker({
    position: { lat: x, lng: y },
    map,
    title: userName,
  });

  return (
  // Important! Always set the container height explicitly
    <div style={{ margin: '10px', height: '400px', width: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDZEnptJhEhjeXm-meAeEJJx3TkvTdO3yo' }}
        defaultCenter={defaultMapState.center}
        defaultZoom={defaultMapState.zoom}
      >
        {/* <TalkPerson */}
        {/*  lat={x} */}
        {/*  lng={y} */}
        {/*  username={userName} */}
        {/* /> */}

        {/* <Marker */}
        {/*  lat={x} */}
        {/*  lng={y} */}
        {/* /> */}

        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded=
        {({ map, maps }) => renderMarkers(map, maps)}

      </GoogleMapReact>
    </div>
  );
};

export default Map;
