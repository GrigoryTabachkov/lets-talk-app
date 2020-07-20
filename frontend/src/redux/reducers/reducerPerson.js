import { WATCH_USER_POSITION } from '../actions/action-types';
// case STOP_WATCH_USER_POSITION: => const watch = false;

const initialState = {};

const reducerPeron = (state = initialState, action) => {
  switch (action.type) {
    case WATCH_USER_POSITION:
      return [
        ...state, {
          userId: action.payload.user,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      ];
    default:
      return state;
  }
};

export default reducerPeron;
