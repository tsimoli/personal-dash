import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import home  from './home';
import session              from './session';
import weather from './weather';

export default combineReducers({
  routing: routerReducer,
  home: home,
  weather: weather,
  session: session
});
