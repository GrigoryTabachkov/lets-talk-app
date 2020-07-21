import { WATCH_USER_POSITION } from '../actions/action-types';
// case STOP_WATCH_USER_POSITION: => const watch = false;

const initialState = {};

const reducerPeron = (state = initialState, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    case WATCH_USER_POSITION:
      return [
        ...action.payload.usersLocation
      ];
    default:
      return state;
  }
};

export default reducerPeron;
