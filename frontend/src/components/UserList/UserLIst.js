import React from 'react';
import UserInfo from '../UserInfo/UserInfo.jsx';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',

  },
};
export default function UserList({ list }) {
  return (

    <div style={styles.div}>
      {
        list.map((el) => <UserInfo
          key={Math.floor(Math.random() * 1000)}
          data={el} />)
        }
    </div>

  );
}
