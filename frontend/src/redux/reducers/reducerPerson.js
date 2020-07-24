import { WATCH_USER_POSITION, CHANGE_STORE_WS } from '../actions/action-types';

const initialState = {};

const reducerPeron = (state = initialState, action) => {
  console.log('ACTION', action);
  switch (action.type) {
    case WATCH_USER_POSITION:
      return {
        ...state, users: [...action.payload.users], locations: [...action.payload.usersLocation],
      };
    case CHANGE_STORE_WS:
      return {
        ...state, users: [...action.payload.users], locations: [...action.payload.locations],
      };

    default:
      return state;
  }
};

export default reducerPeron;
