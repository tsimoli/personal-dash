import { Socket } from 'phoenix';
import Constants  from '../constants';

const socket = new Socket('/socket');

socket.connect();

const dashChannel = socket.channel('personal_dash:stream');

dashChannel.join()
.receive("ok", resp => {
  console.log("Joined successfully", resp)
})
.receive("error", resp => {
  console.log("Unable to join", resp)
})

const initialState = {
  socket: socket,
  dashChannel: dashChannel
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.RECONNECT:
      return {
        ...state,
        socket: action.socket,
        dashChannel: action.channel,
      };
    default:
      return state;
  }
}
