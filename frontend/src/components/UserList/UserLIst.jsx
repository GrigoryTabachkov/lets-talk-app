import React from 'react';
import UserInfo from '../UserInfo/UserInfo.jsx';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    overflow: 'auto',
    height: 300,

  },
};
export default function UserLIst({ list }) {
  console.log(list);
  return (
    <>
      <div style={styles.div}>
        {
        list.map((el) => (
          <UserInfo
            key={Math.floor(Math.random() * 10000)}
            data={el}
          />
        ))
        }
      </div>
    </>
  );
}
