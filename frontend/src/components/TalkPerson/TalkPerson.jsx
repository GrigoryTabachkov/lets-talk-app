import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { usePosition } from 'use-position';
// import { watchUserPosition } from '../../redux/actions/actions';

const TalkPerson = ({ text }) => {
  // useEffect(() => { // fetch в экшне на бэк через редюсер (эффект не нужен) отправляю лат, ланг, получаю массив объектов в стор
  //   dispatch(watchUserPosition(latitude, longitude));
  //   console.log('useEffect: ', latitude, longitude);
  // }, [dispatch, latitude, longitude]);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};
// TalkPerson.propTypes = {
//
// };

export default TalkPerson;
