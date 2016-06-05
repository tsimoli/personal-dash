import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { attachChannelEvents } from '../../actions/home'

class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, dashChannel } = this.props;
    dispatch(attachChannelEvents(dashChannel));
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
          <h1>Test</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { ...state.session, ...state.home }
);

export default connect(mapStateToProps)(HomeIndexView);
