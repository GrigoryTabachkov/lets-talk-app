import { ADD_TOPIC, CHANGE_TOPIC, DELETE_TOPIC } from '../actions/action-types';

const initialState = {
  userName: 'adgs',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOPIC:
      return { ...state, userName: action.payload };
    case CHANGE_TOPIC:
      return { ...state, title: action.payload };
    case DELETE_TOPIC:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

// export default reducerPeron;
