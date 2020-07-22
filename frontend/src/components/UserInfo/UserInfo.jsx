import React from 'react';

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    border: 'solid black 1px',
    margin: 5,
  },
};
export default function UserInfo({ data }) {
  return (
    <div style={styles.div}>
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
