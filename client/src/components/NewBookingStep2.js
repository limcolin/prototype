import React from "react";
import { Tab, Button, Icon, Card, Message } from 'semantic-ui-react';
import BerthSchedule from './BerthSchedule'
import MapContainer from './MapContainer';
import Arrival from './Arrival'

const NewBookingStep2 = ({
  dispatch,
  arrivals,
  postBooking,
  setStep,
  anchorages,
  setSelectedDelivery,
  deliveries,
  hoverDelivery,
  hoveredDelivery,
  newBooking,
  loading
}) => {

  const groupedDeliveries = deliveries.reduce((result, delivery) => {
    (result[delivery["timeslot"]] = result[delivery["timeslot"]] || []).push(delivery);
    return result;
  }, {});

   const confirmBooking = () => {
     postBooking(newBooking)
   }

   const prevStep = () => {
     setStep(1)
   }

  /*const panes = groupedDeliveries.length <= 0 ? [] : Object.keys(groupedDeliveries).map(timeslot => {
    return {
      menuItem: timeslot,
      render: () => {
        return (
          <>
            <Tab.Pane style={{ padding: 0, marginBottom: 0 }}>
              <MapContainer newBooking={newBooking} deliveries={groupedDeliveries[timeslot]} hoveredDelivery={hoveredDelivery} anchorages={anchorages} />
              <BerthSchedule arrivals={arrivals} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} newBooking={newBooking} deliveries={groupedDeliveries[timeslot]} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} />
            </Tab.Pane>
            <div style={{ padding: '20px' }} className="buttonPanel">
              <Button style={{ width: '56px', marginRight: '10px' }} onClick={prevStep} ><Icon name='angle left' /></Button>
              <Button style={{ width: 'calc(100% - 66px)', marginRight: 0 }} onClick={confirmBooking} positive content="Book Lighter" />
            </div>
          </>
        )
      }
    }
  })*/
  const panes = groupedDeliveries.length <= 0 ? [] : [{
    menuItem: "Now",
    render: () => {
      return (
        <>
          <Tab.Pane style={{ padding: 0, marginBottom: 0 }}>
            <MapContainer newBooking={newBooking} deliveries={deliveries} hoveredDelivery={hoveredDelivery} anchorages={anchorages} />
            <Card.Group style={{ padding: '10px', margin: 0, background: '#fcfcfc' }} itemsPerRow={1}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><h4>Available Crafts</h4><a style={{ float: 'right' }}>View All</a></div>
              {
                arrivals.slice(0, 13).map((arrival, index) => {
                  return <Arrival dispatch={dispatch} arrival={arrival} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} key={deliveries[index].id} delivery={deliveries[index]} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} />
                })
              }
            </Card.Group>
          </Tab.Pane>
          <div style={{ padding: '20px' }} className="buttonPanel">
            <Button style={{ width: '56px', marginRight: '10px' }} onClick={prevStep} ><Icon name='angle left' /></Button>
            <Button loading={loading} style={{ width: 'calc(100% - 66px)', marginRight: 0 }} onClick={confirmBooking} positive content="Book Lighter" />
          </div>
        </>
      )
    }
  }].concat(Object.keys(groupedDeliveries).map(timeslot => {
    return {
      menuItem: timeslot,
      render: () => {
        return (
          <>
            <Tab.Pane style={{ padding: 0, marginBottom: 0 }}>
              <MapContainer newBooking={newBooking} deliveries={groupedDeliveries[timeslot]} hoveredDelivery={hoveredDelivery} anchorages={anchorages} />
              <BerthSchedule arrivals={arrivals} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} newBooking={newBooking} deliveries={groupedDeliveries[timeslot]} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} />
            </Tab.Pane>
            <div style={{ padding: '20px' }} className="buttonPanel">
              <Button style={{ width: '56px', marginRight: '10px' }} onClick={prevStep} ><Icon name='angle left' /></Button>
              <Button style={{ width: 'calc(100% - 66px)', marginRight: 0 }} onClick={confirmBooking} positive content="Book Lighter" />
            </div>
          </>
        )
      }
    }
  }))

  return <Tab style={{ marginBottom: 0 }} menu={{ pointing: true, attached: 'bottom' }} panes={panes} />
}

export default NewBookingStep2
