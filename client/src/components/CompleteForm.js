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
      <Segment style={{ left: '50%', position: 'fixed', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>

        <Form onSubmit={sendIdToUpdate}>
        <Input name="completedTime" type="number" onChange={sendEditedField} />
        <Form.Field control={Button} content="Submit" />
        </Form>

      </Segment>
    </Portal>
  )
}

export default CompleteForm
