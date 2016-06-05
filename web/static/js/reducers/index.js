import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import home  from './home'
import session              from './session';

export default combineReducers({
  routing: routerReducer,
  home: home,
  session: session
});
