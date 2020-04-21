import React from 'react';
import { Flag, Icon, Header, Label } from 'semantic-ui-react';

const Destination = ({ arrivals, anchorages, bookings, hoveredBooking }) => {
  const terminals = [
    {
      "id": 0,
      "name": "Marina South Wharves",
      "address": "71 Marina Coastal Drive Singapore 018946",
      "phone": "+65 6604 9405",
      "fax": "+65 6604 9403",
      "email": "jpcss@jp.com.sg",
      "coordinates": {
        "latitudeDegrees": 1.2696778,
        "longitudeDegrees": 103.8577001
      }
    },
    {
      "id": 1,
      "name": "Penjuru Lighter Terminal",
      "address": "42G Penjuru Road Singapore 609151",
      "phone": "+65 6316 2071",
      "fax": "+65 6316 2072",
      "email": "jpcss@jp.com.sg",
      "coordinates": {
        "latitudeDegrees": 1.302776,
        "longitudeDegrees": 103.7275123
      }
    }
  ]

  const getBooking = () => {
    if(hoveredBooking !== null) {
      return bookings.find(booking => booking.id === hoveredBooking)
    }
    return {}
  }
  const booking = getBooking()

  const getTerminalDetails = () => {
    if(booking && booking.terminalName) {
      return terminals.find(terminal => terminal.name === booking.terminalName)
    }
    return {}
  }
  const terminalDetails = getTerminalDetails()

  const renderDestinations = () => {
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
        <div className="DestinationRowWrapper" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="destination-row">
            <div className="destination-header">
              <Header><Icon style={{ marginRight: '40px', marginLeft: '-22px', display: 'inline-block', background: '#324354', color: 'white', fontSize: '20px', paddingTop: '10px', paddingBottom: '10px', height: '40px', width: '40px' }} name="warehouse" />
                {booking.terminalName} ({booking.craneNumber})
                {departedTerminal &&
                  <Label style={{ marginLeft: '15px' }} color="green" pointing="left"><Icon name="ship" />DEPARTED</Label>
                }
                <Header.Subheader style={{ paddingLeft: '59px' }}>
                {terminalDetails.address}
                </Header.Subheader>
              </Header>
              <div style={{ paddingLeft: '59px' }}>
                <Icon name="phone" />{terminalDetails.phone} <Icon style={{ marginLeft: '15px' }} name="fax" />{terminalDetails.fax} <Icon style={{ marginLeft: '15px' }} name="mail" />{terminalDetails.email}
              </div>
            </div>
            <div className="destinationBody" style={{ marginRight: '59px', padding: '25px', marginTop: '30px', marginBottom: '70px', background: 'white', marginLeft: '59px', border: '2px solid rgba(34, 36, 38, 0.15)' }}>

              <Icon name="ship" /> {booking.lighterName} <Icon style={{ marginLeft: '15px' }} name="tag" />{booking.lighterId} <br />
              {booking.lighterCompany} <br />
              Arrived: {booking.arrivedDate} {booking.arrivedTime} <br />
              Load Time: {booking.loadTime}
            </div>
          </div>

          {
            booking.destinations.map((destination, destinationIndex) => {
              const anchorageDetails = anchorages.find(anchorage => anchorage.code === destination.anchorage)
              return (
                <div key={booking.id + destinationIndex} className="destination-row">
                  {anchorageDetails &&
                    <>
                      <div className="destination-header">
                        <Header><Icon style={{ marginRight: '40px', marginLeft: '-22px', display: 'inline-block', background: '#324354', color: 'white', fontSize: '20px', paddingTop: '10px', paddingBottom: '10px', height: '40px', width: '40px' }} name="anchor" />
                          {anchorageDetails.name} ({anchorageDetails.code})
                          {booking.completed &&
                            <Label style={{ marginLeft: '15px' }} color="green" pointing="left"><Icon name="check circle" />Completed</Label>
                          }
                          <Header.Subheader style={{ paddingLeft: '59px' }}>
                          {anchorageDetails.description}
                          </Header.Subheader>
                        </Header>
                        <div style={{ paddingLeft: '59px' }}>
                          Anchorage Bounds: {anchorageDetails.coordinates.map((coords, coordsIndex) => {
                            return (<Label key={anchorageDetails.code + booking.id + destinationIndex + coordsIndex} style={{ borderRadius: '15px' }}>{coords}</Label>)
                          })}
                        </div>
                      </div>
                    </>
                  }
                  <div className="destinationBody" style={{ marginRight: '59px', padding: '25px', marginTop: '30px', marginBottom: '70px', background: 'white', marginLeft: '59px', border: '2px solid rgba(34, 36, 38, 0.15)' }}>
                    <span><Icon name="ship" /> {destination.vessel} <Flag name={destination.flag} /></span> <br />
                    IMO Number: {destination.imoNumber} <br />
                    Pallets: {destination.pallets} <br />
                    Estimated Arrival: {booking.loadTime + (destination.stop * 100)}
                    <div className="DestinationRowInnerleft" style={{ minWidth: '230px', textAlign: 'right', paddingRight: '20px' }}>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </>
    )
  }

  return (
    <div style={{ borderLeft: '5px solid #324354', height: '100%', position: 'fixed' }}>
      { booking && booking.destinations && terminalDetails && arrivals &&
        renderDestinations()
      }
    </div>
  )
}

export default Destination;
