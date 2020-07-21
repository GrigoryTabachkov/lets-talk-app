import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerPeron from './reducers/reducerPerson';
// import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

const preloadedState = [
//   {
//   userId: '',
//   userName: '',
//   latitude: Number,
//   longitude: Number,
// }
];

const mainStore = createStore(
  reducerPeron,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default mainStore;