import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { browserHistory }       from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './store';
import Root                     from './containers/root';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import { Provider }             from 'react-redux';

const store  = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('app');

ReactDOM.render(
  <MuiThemeProvider>
   <Provider store={store}>
    <div>
      <Root routerHistory={history} store={store}/>;
    </div>
   </Provider>
  </MuiThemeProvider>
, target);
