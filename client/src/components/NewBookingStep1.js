import React from "react";
import { Form, Input, Label, Dropdown, Checkbox, Icon, Search, Flag, Segment, Button } from 'semantic-ui-react';

const NewBookingStep1 = ({
  setStep,
  searchResults, setSearchResults,
  searchValue, setSearchValue,
  loading, setLoading,
  dispatch,
  searchVessel,
  vesselData,
  setVesselData,
  anchorageOptions,
  newBooking
}) => {

  const handleResultSelect = (e, { result }) => {
    dispatch({ type: "destination", value: { stop: 1, vessel: result.data.vesselName, callSign: result.data.callSign, imoNumber: result.data.imoNumber, flag: result.data.flag.toLowerCase() } })
  }

  const handleSearchChange = (e, { value }) => {
    setSearchValue(value)
  }

  const resultRenderer = ({ title, data }) => {
    return (
      <><Flag name={data.flag.toLowerCase()} /> {data.vesselName} <Label content={title} /></>
    )
  }

  const nextStep = () => {
    setStep(2)
  }

  return (
    <Segment style={{ border: 'none' }}>
      <Form.Field>
        <label><Icon name="pallet" /> Number of Pallets</label>
        <Input onChange={e => dispatch({ type: "destination", value: {stop: 1, pallets: parseInt(e.target.value)} })} type="number" />
      </Form.Field>
      <Form.Field>
        <label><Icon name="time" /> Load By Time</label>
        <Input onChange={e => dispatch({ type: "loadTime", value: e.target.value })} type="number" />
      </Form.Field>
      <Form.Field>
        <label><Icon name="anchor" /> Anchorage</label>
        <Dropdown
          search
          selection
          placeholder="Anchorage"
          options={anchorageOptions}
          onChange={(e, data) => dispatch({ type: "destination", value: {stop: 1, anchorage: data.value} })}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I need to load at this specific time' />
      </Form.Field>
      <h4><Icon name="ship" /> Vessel Information</h4>
      <Form.Field>
        <label>Name</label>
        <Search
            loading={loading}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            results={searchResults}
            value={searchValue}
            resultRenderer={resultRenderer}
          />
      </Form.Field>
      <Form.Field>
        <label>Call Sign</label>
        <Input value={newBooking.destinations[1].callSign} onChange={e => dispatch({ type: "destination", value: {stop: 1, callSign: e.target.value} })} type="text" />
      </Form.Field>
      <Form.Field>
        <label>IMO Number</label>
        <Input value={newBooking.destinations[1].imoNumber} onChange={e => dispatch({ type: "destination", value: {stop: 1, imoNumber: e.target.value} })} type="number" />
      </Form.Field>
      <div style={{ padding: '1em 0', textAlign: 'center' }} className="buttonPanel">
        <Button style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }} onClick={nextStep} positive content="Choose Delivery Slot" />
      </div>
    </Segment>
  )
}

export default NewBookingStep1
