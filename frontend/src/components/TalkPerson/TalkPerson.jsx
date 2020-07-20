import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

const TalkPerson = () => {
  const { userName, x, y } = useSelector((state) => ({
    userName: state.userName,
    x: state.x,
    y: state.y,
  }));
  console.log('person >>>>>>>>>>', userName, x, y);

  return (
    <div>
      <h1>{userName}</h1>
      <h3>{x}</h3>
      <h3>{y}</h3>
      {/* <select multiple="true" name="" id=""> */}
      {/*  <option value="travel"> */}
      {/*    Travel */}
      {/*  </option> */}
      {/*  <option value="cars"> */}
      {/*    Cars */}
      {/*  </option> */}
      {/* </select> */}
      <ul>
        <li>Topic: 1</li>
        <li>Topic: 2</li>
        <li>Topic: 3</li>
        {/* <li>Topic: 4, points: 2</li> */}
        {/* <li>Topic: 5, points: 1</li> */}
      </ul>
    </div>
  );
};
// TalkPerson.propTypes = {
//
// };

export default TalkPerson;
