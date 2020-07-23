import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeStore } from '../../redux/actions/actions';
import Context from '../../context/Context';

// const i = 50;
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
    // order: --i,
  }

};

export default function Chart({ user }) {
  const [message, setMessage] = useState([]);
  const {userChoose} = useContext(Context)
  console.log('userChoose', userChoose)
  const state = useSelector((state)=>state)
  const [users, setUsers] = useState(state.users)
  const [locations, setLocations] = useState(state.locations)

  console.log('ChartUser', user.user._id);
  const dispatch = useDispatch();
  const W1 = new WebSocket('ws://localhost:8090');
  W1.onopen = function () {
    console.log('connect');
  };
  W1.onmessage = function (data) {
    console.log('Message!!!!', JSON.parse(data.data));

    const dataParse = JSON.parse(data.data);
    const rightMess = dataParse.charts.filter((el)=>{
      if(el.userId1==user.user._id||el.userId2==user.user._id){
        return el
      }}
    )
    setMessage(rightMess);
    // setUsers(dataParse.users)
    // setLocations(dataParse.locations)
  };
  W1.onclose = function (data){
    console.log('connectionClose')
  }
  //------------------
  const W2 = new WebSocket('ws://localhost:9000');
  W2.onopen = function () {
    console.log('connectW2');
  };
  W2.onmessage = function (data) {
    console.log('MessageW2!!', JSON.parse(data.data));

    const dataParse = JSON.parse(data.data);
    console.log('dataParse!!!!', dataParse)
    // const rightMess = dataParse.charts.filter((el)=>{
    //   if(el.userId1==user.user._id||el.userId2==user.user._id){
    //     return el
    //   }}
    // )
    // setMessage(rightMess);
    setUsers(dataParse.users)
    setLocations(dataParse.locations)

  };
  W2.onclose = function (data){
    console.log('connectionCloseW2')
  }
  //------------------
  
  useEffect(()=>{
    
    dispatch(toChangeStore({users: users, locations: locations}));
  }, [locations, users])

  function handleClick(e) {
    e.preventDefault();
    console.log('ClickChart', e.target.myMes.value);
    W2.send(user.user._id)
    W1.send(JSON.stringify({ text: e.target.myMes.value, userName: user.user.userName, userId1: user.user._id, userId2: userChoose }));
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
      message.map((el) => <span style={styles.span}>{el.userName}: {el.text}</span>)
    }
    </div>
    </>
  );
}
