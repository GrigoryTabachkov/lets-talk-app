import { WATCH_USER_POSITION } from './action-types';

export const watchUserPosition = (payload) => ({
  payload,
  type: WATCH_USER_POSITION,
}
);
export const toSendCoordinat = (payload) => async (dispatch) => {
  console.log('ACTION_PAYLOAD>>>', payload);
  if (payload.lat !== '') {
    const response = await fetch('/coordinat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: payload.lat,
        lng: payload.lng,
      }),
    });
    const res = await response.json();
    console.log('RESSSSSS', res);

    dispatch(watchUserPosition(res));
  }
};
