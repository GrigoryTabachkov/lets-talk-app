import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
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
    fontColor: '#ECEFF4',
  },
  divSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid black 1px',
    margin: 5,
    backgroundColor: '#88C0D0',
    fontSize: 18,
    borderRadius: '15px',
    fontWeight: 'bold',
    fontColor: 'white',
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
      <span>{data.userName}</span>
      <span>Интересы:</span>
      {
        data.interests.map((el) => <span>{el}</span>)
      }
      <span>
        Email:
        {data.email}
      </span>
    </div>
  );
}
