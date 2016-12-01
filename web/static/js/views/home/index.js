import React    from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { attachChannelEvents , fetchLamData, fetchWeatherData } from '../../actions/home';
import LamDataCards from '../../components/lam-data-cards';
import WeatherCards from '../../components/weather-data-cards';

class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, dashChannel } = this.props;
    dispatch(attachChannelEvents(dashChannel));
    dispatch(fetchLamData());
    dispatch(fetchWeatherData());
  }

  render() {
    const { dispatch, lamData, weatherData } = this.props;
    return (
      <div>
        <div className="section">
          <h5 className="center">Liikenne</h5>
          <div className="row">
            <LamDataCards lamDatas={ lamData }/>
          </div>
        </div>
        <div className="divider"></div>
        <div className="section">
          <h5 className="center">Sää</h5>
          <div className="row">
              <WeatherCards weatherDatas={ weatherData }/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { ...state.session, ...state.home }
);

export default connect(mapStateToProps)(HomeIndexView);
