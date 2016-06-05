import Constants      from '../constants';
import { httpGet }  from '../utils';

export function attachChannelEvents(dashChannel) {
  return dispatch => {
    dashChannel.on("lemmatized_text", payload => {
      dispatch({
        type: Constants.NEW_TEXT,
        new_text: payload.new_val
      });
    })

    dashChannel.on("word_counts", payload => {
      dispatch({
        type: Constants.WORDS,
        word: payload.new_val
      });
    })
  };
}
