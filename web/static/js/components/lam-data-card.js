import React from 'react'

export default class LamDataCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { lamData }  = this.props;
    var measurement_time = new Date(lamData.measurement_time);
    var dateOptions = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    }
    return (
          <div className="col s3">
            <div className="card green darken-1">
              <div className="card-content white-text">
                <span className="card-title">{ lamData.location_name }</span>
                <p>{ lamData.average_speed2 } km/h</p>
                <p>{ lamData.traffic_volume2 } autoa/h</p>
                <p>{ measurement_time.toLocaleDateString("fi-FI", dateOptions) }</p>
              </div>
            </div>
          </div>
        )
  }
}
