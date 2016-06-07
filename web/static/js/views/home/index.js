import React    from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { attachChannelEvents , fetchLamData} from '../../actions/home'
import LamDataCards from '../../components/lam-data-cards'

class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, dashChannel } = this.props;
    dispatch(attachChannelEvents(dashChannel));
    dispatch(fetchLamData());
  }

  render() {
    const { dispatch, lamData } = this.props;
    return (
      <div>
        <div className="row">
          <LamDataCards lamDatas={ lamData  }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { ...state.session, ...state.home }
);

export default connect(mapStateToProps)(HomeIndexView);
