import { ADD_TOPIC } from './action-types';

export const addTopic = (payload) => ({
  payload,
  type: ADD_TOPIC,
}
);
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
