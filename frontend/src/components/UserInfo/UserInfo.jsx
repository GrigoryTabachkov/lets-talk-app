import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Context from '../../context/Context';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid black 1px',
    borderRadius: '10px',
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#E5E9F0',
  },
  divSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid black 1px',
    margin: 5,
    backgroundColor: '#D8DEE9',
    fontSize: 18,
    borderRadius: '15px',
    fontWeight: 'bold',
  },
  userData: {
    color: '#3B4252',
  },
};
export default function UserInfo({ data }) {
  const { setStateMap, setUserChoose, userChoose } = useContext(Context);
  const state = useSelector((state) => state);
  const obj = {};

  state.locations.map((el) => {
    if (el.user === data._id) {
      obj.lat = el.lat;
      obj.lng = el.lng;
    }
  });

  let stylesVariant = styles.div;
  if (userChoose === data._id) {
    stylesVariant = styles.divSelect;
  }
  return (
    <div
      style={stylesVariant}
      onClick={() => {
        setStateMap([{ lat: obj.lat, lng: obj.lng, id: data._id }]);
        setUserChoose(data._id);
      }}
    >
      <span style={styles.userData}>{data.userName}</span>
      <span style={styles.userData}>Интересы:</span>
      {
        data.interests.map((el) => <span style={styles.userData}>{el}</span>)
      }
      <span style={styles.userData}>
        Email:
        {data.email}
      </span>
    </div>
  );
}
