import React from "react";
import { Form, Button, Segment, Step, Portal, Dimmer, Loader, Icon, Label } from 'semantic-ui-react';
import MapContainer from './MapContainer'
import NewBookingStep1 from './NewBookingStep1'
import NewBookingStep2 from './NewBookingStep2'

const BookingForm = ({
  gapikey,
  arrivals,
  searchResults, setSearchResults,
  searchValue, setSearchValue,
  loading, setLoading,
  loaderResult, setLoaderResult,
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
        return <NewBookingStep2 gapikey={gapikey} loaderResult={loaderResult} loading={loading} dispatch={dispatch} arrivals={arrivals} postBooking={postBooking} setStep={setStep} anchorages={anchorages} setSelectedDelivery={setSelectedDelivery} deliveries={deliveries} hoverDelivery={hoverDelivery} hoveredDelivery={hoveredDelivery} newBooking={newBooking} />
      case 3:
        return <Form.Field control={Button} content="Submit" />
      default:
        return <NewBookingStep1 searchResults={searchResults} setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} loading={loading} setLoading={setLoading} dispatch={dispatch} searchVessel={searchVessel} vesselData={vesselData} setVesselData={setVesselData} anchorageOptions={anchorageOptions} newBooking={newBooking} />
    }
  }

  const handleClose = () => {
    setStep(1)
    setLoaderResult({ status: '', result: {} })
    dispatch({ type: "price", value: null });
    dispatch({ type: "terminalName", value: '' });
    dispatch({ type: "craneNumber", value: '' });
    dispatch({ type: "lighterName", value: '' });
    dispatch({ type: "lighterId", value: '' });
    dispatch({ type: "lighterCompany", value: '' });
    dispatch({ type: "arrivedDate", value: '' });
    dispatch({ type: "arrivedTime", value: '' });
    dispatch({ type: "totalPallets", value: null });
    dispatch({ type: "loadTime", value: null });
    dispatch({ type: "completed", value: false });
    dispatch({ type: "completedTime", value: null });
    dispatch({ type: "destinations", value: [
      {stop: 0, anchorage: '', vessel: '', callSign: '', imoNumber: null, flag: '', pallets: null},
      {stop: 1, anchorage: '', vessel: '', callSign: '', imoNumber: null, flag: '', pallets: null}
    ]});
  }

  return (
    <Portal closeOnTriggerClick openOnTriggerClick onClose={handleClose} trigger={<Button style={{ borderRadius: 0, background: "#324354" }} color='black' size='large'>Start a request</Button>}>
      <Segment style={{ border: '1px solid #324354', maxHeight: '90vh', overflowY: 'auto', boxShadow: '3px 3px 7px 3px rgba(34,36,38,.15)', borderRadius: '8px', padding: 0, left: '50%', position: 'fixed', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>

      { loaderResult.status !== '' &&
        <Segment>
          <Dimmer active={loaderResult.status === 'Processing'}>
            <Loader>Loading</Loader>
          </Dimmer>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
            {loaderResult.status === 'Confirmed' &&
              <>
                <Icon name="check circle" size='huge' color='green' />
                Booking Confirmed
              </>
            }

            <Icon name="ship" />{newBooking.lighterId}
            <span style={{ fontWeight: 700 }}>{newBooking.lighterName}</span>
            <span>{newBooking.lighterCompany}</span>
            <span>Pallets: {newBooking.destinations[newBooking.destinations.length - 1].pallets}</span>
            <span>Price: ${newBooking.price}</span>
            <span>Terminal: {newBooking.terminalName}</span>
            <span>Crane: {newBooking.craneNumber}</span>
            <span>Anchorage: {newBooking.destinations[1].anchorage}</span>
            <span>Vessel: {newBooking.destinations[1].vessel}</span>
          </div>
        </Segment>
      }
      { loaderResult.status === '' &&
        <>
          <Step.Group style={{ marginTop: 0, marginBottom: 0 }} size="mini" fluid ordered>
            <Step onClick={stepOne} active={step === 1}>
              <Step.Content>
                <Step.Title>New Request</Step.Title>
                <Step.Description>Create A New Delivery Request</Step.Description>
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
        </>
      }
      </Segment>
    </Portal>
  )
}

export default BookingForm
