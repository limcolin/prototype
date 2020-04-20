import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon } from 'semantic-ui-react';

const Arrival = ({ dispatch, arrival, anchorages, setSelectedDelivery, delivery, hoverDelivery, hoveredDelivery }) => {

  const toggleHover = () => {
    hoverDelivery(delivery.id);
  }

  const clearHover = () => {
    hoverDelivery(null);
  }

  const calcPrice = () => {
    return ((delivery.pallets / 2) * 10)
  }

  const lighterArray = arrival.lighterName === null ? [] : arrival.lighterName.split("/")
  const arrivedTimeArray = arrival.arrivedTime === null ? [] : arrival.arrivedTime.split(" ")

  const terminalName = arrival.terminalName === null ? '' : arrival.terminalName
  const lighterId = lighterArray.length === 0 ? '' : (lighterArray.length === 1 ? lighterArray[0] : lighterArray[1])
  const lighterName = lighterArray.length === 0 ? '' : lighterArray[0]
  const lighterCompany = arrival.lighterCompany === null ? '' : arrival.lighterCompany
  const craneNumber = arrival.craneNumber === null ? '' : arrival.craneNumber
  const arrivedDate = arrivedTimeArray.length === 0 ? '' : (arrivedTimeArray.length > 2 ? arrival.arrivedTime : arrivedTimeArray[0])
  const arrivedTime = arrivedTimeArray.length === 0 ? '' : (arrivedTimeArray.length > 2 ? arrival.arrivedTime : arrivedTimeArray[1])

  const selectDelivery = () => {
    dispatch({ type: 'terminalName', value: terminalName })
    dispatch({ type: 'lighterName', value: lighterName})
    dispatch({ type: 'lighterId', value: lighterId.replace(' ', '')})
    dispatch({ type: 'lighterCompany', value: lighterCompany})
    dispatch({ type: 'arrivedDate', value: arrivedDate})
    dispatch({ type: 'arrivedTime', value: arrivedTime})
    dispatch({ type: 'craneNumber', value: craneNumber})
    setSelectedDelivery(delivery.id)
  }

  return (
    <Card
      style={{
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        margin: 0,
        border: 'none',
        color: 'black',
        ...(hoveredDelivery === delivery.id ? {border: '1px solid green'} : {})
      }}

      onClick={selectDelivery}
      onMouseEnter={toggleHover}
      onMouseLeave={clearHover}
      raised={hoveredDelivery === delivery.id}
    >
      <Card.Content style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '10%', display: 'flex', alignItems: 'center' }}>
          <Icon name="ship" size='large' />
        </div>
        <div style={{ width: '70%' }}>
          <span style={{ fontWeight: 700 }}>{lighterName}</span> {lighterId} <br />
          <span style={{ color: 'grey' }}><Icon name="warehouse" /> {terminalName} - {craneNumber} </span><br />
          <span style={{ color: 'grey' }}><Icon name="sign-in" /> Arrived: {arrivedDate} {arrivedTime}</span><br />
          <span style={{ color: 'grey' }}><Icon name="dolly" /> Load time: {delivery.timeslot}<br /><Icon name="clock" /> Estimated drop off: {delivery.timeslot + 100}</span>
        </div>
        <div style={{ width: '20%', textAlign: 'right', fontWeight: 700 }}>
          {delivery.pallets > 14 ? <Icon name='angle double up' color='red' /> : (delivery.pallets < 6 ? <Icon name='angle double down' color='green' /> : '')}${calcPrice()}
        </div>
      </Card.Content>
    </Card>
  );
}

export default Arrival;
