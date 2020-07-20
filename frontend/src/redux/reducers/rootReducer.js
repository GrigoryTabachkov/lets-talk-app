import { combineReducers } from 'redux';
import reducerTopics from './reducerPerson';

const rootReducer = combineReducers({
  reducerTopics,
  // more reducers
});

export default rootReducer;
