import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Header, Menu, Input, Icon, Table } from 'semantic-ui-react';
import Booking from './Booking';
import ArrivalsTable from './ArrivalsTable'

const ArrivalsPage = ({ arrivals, allArrivals }) => {

  return (
    <div className="contentInnerWrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="contentInnerLeft" style={{ flexShrink: 1, padding: '60px', width: 'calc(100% - 650px)' }}>
        <Header size='huge' as='h1' dividing style={{ fontWeight: 700 }}>
          Arrivals Now
          <Header.Subheader>
            Track current lighter terminal arrivals in real-time.
          </Header.Subheader>
        </Header>
        <ArrivalsTable arrivals={arrivals} />
        <span>Last updated 30 seconds ago.</span>
        <Header size='huge' as='h1' dividing style={{ fontWeight: 700 }}>
          Arrivals History
          <Header.Subheader>
            Lighter terminal arrivals historical data.
          </Header.Subheader>
        </Header>
        <ArrivalsTable arrivals={allArrivals} />
        <span>Last updated 30 seconds ago.</span>
        <div className="bookingsInnerWrapper" style={{ display: 'flex' }}>
          <div className="bookingsInnerLeft" style={{ width: '250px', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>

          </div>
          <div className="bookingsInnerRight" style={{ paddingLeft: '60px', width: 'calc(100% - 250px)'}}>

          </div>
        </div>
      </div>
      <div className="contentInnerRight" style={{ padding: '60px', flexGrow: 1, flexShrink: 0, width: '650px' }}>

      </div>
    </div>
  )
}

export default ArrivalsPage
