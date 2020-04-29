import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Header, Menu, Input, Icon, Table } from 'semantic-ui-react';
import Booking from './Booking';
import Destination from './Destination'
import BookingForm from './BookingForm'

const BookingsPage = ({
  arrivals,
  anchorages,
  bookings,
  bookingFilter, setBookingFilter,
  editBooking,
  updateBooking,
  saveUpdate,
  hoverBooking,
  hoveredBooking,
  searchResults, setSearchResults,
  searchValue, setSearchValue,
  loading, setLoading,
  loaderResult, setLoaderResult,
  setSelectedDelivery,
  hoverDelivery,
  hoveredDelivery,
  step, setStep,
  deliveries,
  newBooking, dispatch,
  postBooking,
  searchVessel,
  vesselData, setVesselData }) => {

  const handleFilterClick = (e, { name }) => {
    setBookingFilter(name)
  }

  return (
    <>
      <div className="contentInnerTop" style={{ width: '100%', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>

      </div>
      <div className="contentInnerWrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="contentInnerLeft" style={{ flexShrink: 1, padding: '60px', width: 'calc(100% - 650px)' }}>
          <Header size='huge' as='h1' dividing style={{ fontWeight: 700 }}>
            Requests
            <div style={{ float: 'right'}}>
              <BookingForm
                arrivals={arrivals}
                searchResults={searchResults} setSearchResults={setSearchResults}
                searchValue={searchValue} setSearchValue={setSearchValue}
                loading={loading} setLoading={setLoading}
                loaderResult={loaderResult} setLoaderResult={setLoaderResult}
                setSelectedDelivery={setSelectedDelivery}
                hoverDelivery={hoverDelivery}
                hoveredDelivery={hoveredDelivery}
                step={step} setStep={setStep}
                deliveries={deliveries}
                newBooking={newBooking} dispatch={dispatch}
                postBooking={postBooking}
                searchVessel={searchVessel}
                vesselData={vesselData} setVesselData={setVesselData}
                anchorages={anchorages}
              />
            </div>
            <Header.Subheader>
              Track and manage your requests.
            </Header.Subheader>
          </Header>
          <div className="bookingsInnerWrapper" style={{ display: 'flex' }}>
            <div className="bookingsInnerLeft" style={{ width: '250px', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>
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
                <Menu.Item><span>{bookings.length} requests in progress.</span></Menu.Item>
              </Menu>
            </div>
            <div className="bookingsInnerRight" style={{ paddingLeft: '60px', width: 'calc(100% - 250px)'}}>
              {bookings.length !== 0 &&
                bookings.map(booking => {
                  return <Booking arrivals={arrivals} key={booking.id} booking={booking} editBooking={editBooking} updateBooking={updateBooking} saveUpdate={saveUpdate} hoverBooking={hoverBooking} />
                })
              }
              {bookings.length === 0 &&
                <h2>You have no current bookings</h2>
              }
            </div>
          </div>
        </div>
        <div className="contentInnerRight" style={{ padding: '60px', flexGrow: 1, flexShrink: 0, width: '650px' }}>
          <Destination arrivals={arrivals} bookings={bookings} hoveredBooking={hoveredBooking} anchorages={anchorages} />
        </div>
      </div>
    </>
  )
}

export default BookingsPage
