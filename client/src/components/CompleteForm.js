import React from "react";
import { Form, Input, Button, Segment, Portal, Icon } from 'semantic-ui-react';

const CompleteForm = ({ booking, editBooking, updateBooking, saveUpdate }) => {

  const sendIdToEdit = () => {
    editBooking(booking.id);
  }

  const sendEditedField = e => {
    updateBooking(e.target.name, e.target.type === 'number' ? parseInt(e.target.value) : e.target.value);
  }

  const cancelEdit = () => {
    editBooking(null);
  }

  const sendIdToUpdate = () => {
    updateBooking('completed', true);
    saveUpdate(booking.id);
  }

  return (
    <Portal closeOnTriggerClick openOnTriggerClick trigger={<Button style={{ borderRadius: 0, marginBottom: '20px', background: "#324354" }} color='black' size='small' onClick={sendIdToEdit}><Icon name='check circle' inverted />Complete</Button>}>
      <Segment style={{ borderRadius: '8px', boxShadow: 'rgba(34, 36, 38, 0.15) 3px 3px 7px 3px', border: '1px solid rgb(50, 67, 84)', left: '50%', position: 'fixed', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>

        <Form onSubmit={sendIdToUpdate}>
        <Form.Field>
          <label><Icon name="clock" />Completed Time</label>
          <Input name="completedTime" type="number" onChange={sendEditedField} />
        </Form.Field>
        <Form.Field>
          <label><Icon name="file alternate" />Upload Delivery Order</label>
          <Input name="deliveryOrder" type="file" onChange={sendEditedField} />
        </Form.Field>
        <Form.Field>
          <Button style={{ width: '100%' }} positive content="Complete" />
        </Form.Field>
        </Form>

      </Segment>
    </Portal>
  )
}

export default CompleteForm
