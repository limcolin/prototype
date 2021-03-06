import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Header, Menu, Input } from 'semantic-ui-react';
import MapContainerOverview from './MapContainerOverview';
import BookingsOverview from './BookingsOverview'
import Destination from './Destination'
import ArrivalsTable from './ArrivalsTable'

const OverviewPage = ({
  gapikey,
  arrivals,
  bookings,
  hoverBooking,
  hoveredBooking,
  anchorages,
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
  setVesselData }) => {

  return (
    <>
      <div className="contentInnerWrapper" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div className="contentInnerLeft" style={{ flexGrow: 1, flexShrink: 0, flexBasis: '960px', maxWidth: '1280px', borderRight: '1px solid rgba(34,36,38,.15)' }}>
          <MapContainerOverview gapikey={gapikey} bookings={bookings} hoveredBooking={hoveredBooking} anchorages={anchorages} />
          <BookingsOverview
            gapikey={gapikey}
            arrivals={arrivals}
            bookings={bookings}
            hoverBooking={hoverBooking}
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
        <div className="contentInnerRight" style={{ margin: '60px', flexGrow: 1, flexShrink: 0, width: '450px' }}>
          <Destination arrivals={arrivals} bookings={bookings} hoveredBooking={hoveredBooking} anchorages={anchorages} />
        </div>
      </div>
    </>
  )
}

export default OverviewPage
