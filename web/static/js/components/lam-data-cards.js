import React from 'react';
import LamDataCard from './lam-data-card';

export default class LamDataCards extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { lamDatas } = this.props;
    var lamDataCards = lamDatas.map((lamData, index) => {
      return <LamDataCard key={ index } lamData={ lamData }/>;
    });
      return (<div className="center">
                { lamDataCards }
              </div>);
  }
}
