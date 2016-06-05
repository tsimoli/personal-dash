import React from 'react'

export default class LamDataCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
          <div className="col s4">
            <div className="card green darken-1">
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>temps</p>
              </div>
            </div>
          </div>
        )
  }
}
