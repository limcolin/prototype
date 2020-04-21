import React from 'react';
import { Progress, Flag, Icon } from 'semantic-ui-react';
import { Route } from "react-router-dom";
import BookingDetails from './BookingDetails'
import CompleteForm from './CompleteForm'

const Booking = ({ arrivals, booking, editBooking, updateBooking, saveUpdate, hoverBooking }) => {

  /*const sendIdToDelete = () => {
    deleteRequest(request.id);
  }

  const sendIdToEdit = () => {
    editBooking(request.id);
  }

  const sendEditedField = e => {
    updateBooking(e.target.name, e.target.type === 'number' ? parseInt(e.target.value) : e.target.value);
  }

  const cancelEdit = () => {
    editBooking(null);
  }

  const sendIdToUpdate = () => {
    saveUpdate(request.id);
  }*/

  const toggleHover = () => {
    hoverBooking(booking.id);
  }

  const clearHover = () => {
    hoverBooking(null);
  }

  const departedTerminal = arrivals.find(arrival =>
    arrival.terminalName.includes(booking.terminalName) &&
    arrival.lighterName.includes(booking.lighterName) &&
    arrival.lighterName.includes(booking.lighterId) &&
    arrival.lighterCompany.includes(booking.lighterCompany) &&
    arrival.craneNumber.includes(booking.craneNumber) &&
    arrival.arrivedTime.includes(booking.arrivedDate) &&
    arrival.arrivedTime.includes(booking.arrivedTime)
  ) === undefined

  return (
    <>
      <div onMouseEnter={toggleHover} className="BookingRowWrapper" style={{ display: 'flex', borderBottom: '1px solid rgba(34, 36, 38, 0.15)', padding: '25px 0 50px 0' }}>
        <div className="BookingRowInnerleft" style={{ width: '300px', textAlign: 'right', paddingRight: '20px' }}>
            <BookingDetails booking={booking} />
        </div>
        <div className="BookingRowInnerCenter" style={{ flexGrow: 1, minWidth: '350px' }}>
          <Progress size='tiny' color='black' total={3} active value={booking.completed ? 3 : (departedTerminal ? 1 : 0)} success={booking.completed}>
            <div style={{ float: 'left', textAlign: 'left' }}>
              <span style={{ fontWeight: 700 }}><Icon name="dolly" />{booking.terminalName} <br /></span>
              Crane Number: {booking.craneNumber} <br />
              Load Time: {booking.loadTime} <br />
            </div>
            <div style={{ float: 'right', textAlign: 'right' }}>
              <Icon name="anchor" />{booking.destinations[1].anchorage} <br />
              <span><Flag name={booking.destinations[1].flag} />{booking.destinations[1].vessel}</span> <br />
              IMO: {booking.destinations[1].imoNumber} <br />
              Estimated Arrival: {booking.loadTime + 100} <br />
            </div>
          </Progress>
        </div>
        <Route exact path="/bookings">
          <div className="BookingRowInnerRight" style={{ minWidth: '230px', paddingLeft: '20px' }}>
            { booking.completed && booking.completedTime &&
              <>
                <Icon name='check circle' style={{ color: 'green' }} /><span>Delivery completed at: {booking.completedTime}</span><br />
                <a href="#">View Delivery Order</a>
              </>
            }
            { !booking.completed &&
              <CompleteForm booking={booking} editBooking={editBooking} updateBooking={updateBooking} saveUpdate={saveUpdate} />
            }
          </div>
        </Route>
        <Route exact path="/">
          <div className="BookingRowInnerRight" style={{ paddingLeft: '20px' }}>

            <Icon name='bookmark' style={{ color: '#324354' }} />

          </div>
        </Route>
      </div>
    </>
  )
}

export default Booking;
