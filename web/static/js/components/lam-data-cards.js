import React from 'react'
import LamDataCard from './lam-data-card'

export default class LamDataCards extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div className="section">
      <div><LamDataCard />
      <LamDataCard />
      <LamDataCard />
      <LamDataCard />
      <LamDataCard /></div>
      </div>
  }
}
