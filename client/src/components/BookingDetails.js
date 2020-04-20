import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Feed, Icon, Label } from 'semantic-ui-react';
import Moment from 'react-moment'

const BookingDetails = ({ booking }) => {
  const timestamp = booking._id.substring(0,8)
  const date = new Date( parseInt( timestamp, 16 ) * 1000 )
  return (
    <>
      <Feed.Event key={booking.id}>
        <Feed.Label as={Label} style={{ background: '#324354', color: 'white', marginBottom: '10px' }} tag><Icon name="ship" />{booking.lighterId}</Feed.Label>


        <Feed.Content>
          <Feed.Summary>
            <span style={{ fontWeight: 700 }}>{booking.lighterName}</span>
          </Feed.Summary>
          <Feed.Extra text>
            {booking.lighterCompany} <br />
            Pallets: {booking.destinations[booking.destinations.length - 1].pallets} <br />
            Price: ${booking.price}
          </Feed.Extra>
          <Feed.Meta>
          <Feed.Date><Moment format="H:mm DD/MM/YY">{date.toString()}</Moment></Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </>
  )
}

export default BookingDetails
