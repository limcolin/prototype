import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Header, Menu, Input, Icon, Table } from 'semantic-ui-react';
import Booking from './Booking';
import Destination from './Destination'


const BookingsPage = ({ arrivals, anchorages, bookings, bookingFilter, setBookingFilter, editBooking, updateBooking, saveUpdate, hoverBooking, hoveredBooking }) => {

  const handleFilterClick = (e, { name }) => {
    setBookingFilter(name)
  }

  return (
    <>
      <div className="contentInnerTop" style={{ width: '100%', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>
        
      </div>
      <div className="contentInnerWrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="contentInnerLeft" style={{ width: '10%', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>
          <Menu fluid vertical borderless style={{ border: 'none', boxShadow: 'none' }}>
            <Menu.Item name='all' onClick={handleFilterClick}>
              All
            </Menu.Item>
            <Menu.Item name='ongoing' onClick={handleFilterClick}>
              Ongoing
            </Menu.Item>
            <Menu.Item name='completed' onClick={handleFilterClick}>
              Complete
            </Menu.Item>
            <Menu.Item>
              <Input icon='search' placeholder='Search bookings...' />
            </Menu.Item>
          </Menu>
        </div>
        <div className="contentInnerCenter" style={{ width: 'calc(89% - 450px)' }}>
          <Header size='huge' as='h1' dividing style={{ fontWeight: 700 }}>
            Bookings
            <Header.Subheader>
              Track and manage your bookings.
              <span style={{ float: 'right' }}>{bookings.length} {bookingFilter} bookings in progress.</span>
            </Header.Subheader>
          </Header>

          {bookings.map(booking => {
            return (
              <>
                { booking &&
                  <Booking key={booking.id} booking={booking} editBooking={editBooking} updateBooking={updateBooking} saveUpdate={saveUpdate} hoverBooking={hoverBooking} />
                }
              </>
            )
          })}
        </div>
        <div className="contentInnerRight" style={{ margin: '60px', flexGrow: 1, flexShrink: 0, width: '450px' }}>
          <Destination bookings={bookings} hoveredBooking={hoveredBooking} anchorages={anchorages} />
        </div>
      </div>
    </>
  )
}

export default BookingsPage
