import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';
import Arrival from './Arrival'

const BerthSchedule = ({ arrivals, anchorages, setSelectedDelivery, deliveries, hoverDelivery, hoveredDelivery }) => {
  return (
    <Card.Group style={{ padding: '10px', margin: 0, background: '#fcfcfc' }} itemsPerRow={1}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><h4>Suggested Crafts</h4><a style={{ float: 'right' }}>View All</a></div>
      {
        arrivals.map((arrival, index) => {
          return <Arrival arrival={arrival} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} key={deliveries[index].id} delivery={deliveries[index]} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} />
        })
      }
    </Card.Group>
  )
}

export default BerthSchedule;
