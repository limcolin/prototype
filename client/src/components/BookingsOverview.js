import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import Booking from './Booking';
import BookingDetails from './BookingDetails'
import BookingForm from './BookingForm'
import ArrivalsTable from './ArrivalsTable'

const BookingsOverview = ({
  gapikey,
  arrivals,
  bookings,
  hoverBooking,
  setHoveredBooking,
  searchResults,
  setSearchResults,
  searchValue,
  setSearchValue,
  loading, setLoading,
  loaderResult, setLoaderResult,
  setSelectedDelivery,
  hoverDelivery,
  hoveredDelivery,
  step,
  setStep,
  deliveries,
  newBooking,
  dispatch,
  postBooking,
  searchVessel,
  vesselData,
  setVesselData,
  anchorages }) => {

  return (
    <div style={{ padding: '40px', background: 'white' }}>
      <div style={{ textAlign: 'right'}}>
        <BookingForm
          gapikey={gapikey}
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
      <Header as='h4' dividing size='medium' style={{ fontWeight: 700 }}>
        Priority + Bookmarked Bookings
        <Link to='/bookings' style={{ fontSize: '14px', color: 'grey', float: 'right', textDecoration: 'underline' }}>See All</Link>
        <Header.Subheader> </Header.Subheader>
      </Header>
      {bookings.length !== 0 &&
        bookings.map(booking => {
          return (
            <Booking
              key={booking.id}
              arrivals={arrivals}
              booking={booking}
              hoverBooking={hoverBooking}
            />
          )
        })
      }
      {bookings.length === 0 &&
        <>
        <h2>You have no current bookings</h2>
        <Link to='/bookings'>Start a new booking</Link>
        </>
      }
      <Header as='h4' dividing size='medium' style={{ fontWeight: 700 }}>
        Current Arrivals
        <Header.Subheader> </Header.Subheader>
      </Header>
      <ArrivalsTable arrivals={arrivals} />
    </div>
  )
}

export default BookingsOverview;
