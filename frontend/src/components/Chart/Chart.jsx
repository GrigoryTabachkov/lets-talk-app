import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeStore } from '../../redux/actions/actions';

const styles = {
  div: {
    width: 250,
    height: 100,
    border: 'solid black 1px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: 5,
    margin: 5,
  },
  span : {
    margin: 5,
  }

};

export default function Chart({ user }) {
  const [message, setMessage] = useState([]);
  console.log('ChartUser', user.user._id);
  const dispatch = useDispatch();
  const W1 = new WebSocket('ws://localhost:8080');
  W1.onopen = function (data) {
    console.log('connect');
  };
  W1.onmessage = function (data) {
    console.log('Message', JSON.parse(data.data));

    const dataParse = JSON.parse(data.data);

    setMessage(dataParse.charts);
    dispatch(toChangeStore(dataParse));
  };

  function handleClick(e) {
    e.preventDefault();
    console.log('ClickChart', e.target.myMes.value);

    W1.send(JSON.stringify({ text: e.target.myMes.value, user: user.user.userName }));
    e.target.myMes.value = '';
  }

  return (
    <>
    <form id="chartForm" action="" onSubmit={handleClick}>
      <textarea name="myMes"></textarea>
      <button type="submit">Send</button>
    </form>
    <div className="chartBody" style={styles.div}>
      {
      message.map((el) => <span style={styles.span}>{el.userId1}: {el.text}</span>)
    }
    </div>
    </>
  );
}
