import React from "react";
import { Form, Button, Segment, Step, Portal } from 'semantic-ui-react';
import MapContainer from './MapContainer'
import NewBookingStep1 from './NewBookingStep1'
import NewBookingStep2 from './NewBookingStep2'

const BookingForm = ({
  arrivals,
  searchResults, setSearchResults,
  searchValue, setSearchValue,
  loading, setLoading,
  setSelectedDelivery,
  deliveries,
  hoverDelivery,
  hoveredDelivery,
  step, setStep,
  postBooking,
  newBooking,
  dispatch,
  searchVessel,
  vesselData, setVesselData,
  anchorages }) => {

  const anchorageOptions = anchorages.map(anchorage => {
    return {
      key: anchorage._id,
      value: anchorage.code,
      text: anchorage.name
    }
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const stepOne = () => {
    setStep(1)
  }
  const stepTwo = () => {
    setStep(2)
  }
  const stepThree = () => {
    setStep(3)
  }

  const renderSteps = () => {
    switch(step) {
      case 1:
        return <NewBookingStep1 setStep={setStep} searchResults={searchResults} setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} loading={loading} setLoading={setLoading} dispatch={dispatch} searchVessel={searchVessel} vesselData={vesselData} setVesselData={setVesselData} anchorageOptions={anchorageOptions} newBooking={newBooking} />
      case 2:
        return <NewBookingStep2 dispatch={dispatch} arrivals={arrivals} postBooking={postBooking} setStep={setStep} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} deliveries={deliveries} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} newBooking={newBooking} />
      case 3:
        return <Form.Field control={Button} content="Submit" />
      default:
        return <NewBookingStep1 searchResults={searchResults} setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} loading={loading} setLoading={setLoading} dispatch={dispatch} searchVessel={searchVessel} vesselData={vesselData} setVesselData={setVesselData} anchorageOptions={anchorageOptions} newBooking={newBooking} />
    }
  }

  return (
    <Portal closeOnTriggerClick openOnTriggerClick trigger={<Button style={{ borderRadius: 0, background: "#324354" }} color='black' size='large'>Start a booking</Button>}>
      <Segment style={{ border: '1px solid #324354', maxHeight: '90vh', overflowY: 'scroll', boxShadow: '3px 3px 7px 3px rgba(34,36,38,.15)', borderRadius: '8px', padding: 0, left: '50%', position: 'fixed', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
        <Step.Group style={{ marginBottom: 0 }} size="mini" fluid ordered>
          <Step onClick={stepOne} active={step === 1}>
            <Step.Content>
              <Step.Title>New Booking</Step.Title>
              <Step.Description>Create A New Delivery Booking</Step.Description>
            </Step.Content>
          </Step>
          <Step onClick={stepTwo} active={step === 2}>
            <Step.Content>
              <Step.Title>Delivery Slot</Step.Title>
              <Step.Description>Choose An Option For Delivery</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        <Form>
          {renderSteps()}
        </Form>
      </Segment>
    </Portal>
  )
}

export default BookingForm
