import { WATCH_USER_POSITION } from './action-types';

export const watchUserPosition = (payload) => ({
  payload,
  type: WATCH_USER_POSITION,
}
);
export const toSendCoordinat = (payload) => async (dispatch) => {
  console.log(payload)
  if(payload.latitude!=''){
    const response = await fetch('/coordinat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lat: payload.latitude,
      lng: payload.longitude,
      },
    )
  })
  const res = await response.json();
  console.log('RESSSSSS', res)
  
    dispatch(watchUserPosition(res));
  
  }
  
}

