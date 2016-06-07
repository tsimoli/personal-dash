import Constants      from '../constants';
import { httpGet }  from '../utils';

export function fetchLamData() {
  return dispatch => {
    httpGet("/api/lamdata")
    .then((data) => {
      dispatch({
        type: Constants.LAM_DATA,
        lamData: data.lam_data.data
      });
    });
  }
}

export function attachChannelEvents(dashChannel) {
  return dispatch => {
    dashChannel.on("lamData", payload => {
      dispatch({
        type: Constants.NEW_TEXT,
        new_text: payload.new_val
      });
    })
  };
}
