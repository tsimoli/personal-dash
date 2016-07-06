import Constants from "../constants";

const initialState = {
    lamData: [],
    weatherData: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case Constants.LAM_DATA:
        return {...state, lamData: action.lamData || []};
    case Constants.NEW_LAM_DATA:
        tmpLamData = state.lamData.filter(function(item) {
            return item.lam_id != action.new_lam_data.lam_id;
        });
        return {...state, lamData: tmpLamData.push(action.new_lam_data) };
    case Constants.WEATHER_DATA:
        return {...state, weatherData: action.weatherData || []};
    case Constants.NEW_WEATHER_DATA:
        return {...state, weatherData: action.weatherData || []};
    default:
        return state;
    }
}
