import React    from 'react';
import { connect }              from 'react-redux';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { attachChannelEvents , fetchLamData} from '../../actions/home';

class WeatherIndexView extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
    }

    render() {
        const { dispatch, lamData } = this.props;
        return (
                <div>
                <div className="row">
                Todo...
                </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => (
    { ...state.session, ...state.weather}
);

export default connect(mapStateToProps)(WeatherIndexView);
