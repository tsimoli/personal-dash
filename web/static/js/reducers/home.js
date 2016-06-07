import Constants from "../constants";

const initialState = {
  lamData: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.LAM_DATA:
      return {...state, lamData: action.lamData || []};
    default:
        return state;
  }
}
