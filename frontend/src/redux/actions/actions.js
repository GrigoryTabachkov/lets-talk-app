import { WATCH_USER_POSITION } from './action-types';

export const watchUserPosition = (payload) => ({
  payload,
  type: WATCH_USER_POSITION,
}
);
export const toSendCoordinat = (payload) => async (dispatch) => {
  const response = await fetch('/coordinat', {
    method: 'POST',
    header: {
      "Content-Type": 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      lat: payload.latitude,
      lng: payload.longitude,
      },
    )
  })
  const res = await response.json();
  console.log(res)
  dispatch(watchUserPosition(res));
}
//
// export const changeTopic = (payload = 'change topic') => ({
//   payload,
//   type: CHANGE_TOPIC,
// }
// );
//
// export const deleteTopic = (payload = 'delete topic') => ({
//   payload,
//   type: DELETE_TOPIC,
// });
//
// const url = 'http://localhost:3001/'; // database
//
// export const loadTopic = () => async (dispatch) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
//
//   dispatch(addTopic(result));
// };
