import React from 'react';
import { Progress, Flag, Icon } from 'semantic-ui-react';
import { Route } from "react-router-dom";
import BookingDetails from './BookingDetails'
import CompleteForm from './CompleteForm'

const Booking = ({ booking, editBooking, updateBooking, saveUpdate, hoverBooking }) => {

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

  return (
    <>
      <div onMouseEnter={toggleHover} className="BookingRowWrapper" style={{ display: 'flex', borderBottom: '1px solid rgba(34, 36, 38, 0.15)', padding: '25px 0 50px 0' }}>
        <div className="BookingRowInnerleft" style={{ minWidth: '230px', textAlign: 'right', paddingRight: '20px' }}>

            <BookingDetails booking={booking} />

        </div>
        <div className="BookingRowInnerCenter" style={{ flexGrow: 1, minWidth: '350px' }}>
          <Progress size='tiny' color='black' total={20} active value={Math.ceil(Math.random() * 20)}>
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
