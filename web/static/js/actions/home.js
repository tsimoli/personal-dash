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
    };
}

export function attachChannelEvents(dashChannel) {
    return dispatch => {
        dashChannel.on("lam_data", payload => {
            dispatch({
                type: Constants.NEW_LAM_DATA,
                new_text: payload.new_val
            });
        });

        dashChannel.on("weather_data", payload => {
            dispatch({
                type: Constants.NEW_LAM_DATA,
                new_text: payload.new_val
            });
        });
    };
}
