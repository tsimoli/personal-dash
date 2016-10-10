import React from 'react';

export default class LamDataCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { lamData }  = this.props;
    var measurement_time = new Date(lamData.measurement_time);
    var dateOptions = {
      year: "numeric", month: "numeric",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return (
          <div className="col s12 m6 l2">
            <div className="card blue-grey lighten-1">
              <div className="card-content black-text">
                <span className="card-title">{ lamData.location_name }</span>
                <h5>Helsinki <span><i className="fa fa-arrow-right"></i></span></h5>
                <p>{ lamData.average_speed2 } km/h</p>
                <p>{ lamData.traffic_volume2 } autoa/h</p>
                <h5><span><i className="fa fa-arrow-left"></i></span> Turku</h5>
                <p>{ lamData.average_speed1 } km/h</p>
                <p>{ lamData.traffic_volume1 } autoa/h</p>
              </div>
              <div class="card-action">
                <p>{ measurement_time.toLocaleDateString("fi-FI", dateOptions) }</p>
              </div>
            </div>
          </div>
    );
  }
}
