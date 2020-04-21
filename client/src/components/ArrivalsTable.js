import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';

const Arrival = ({ arrivals }) => {

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Lighter Name</Table.HeaderCell>
          <Table.HeaderCell>Lighter Company</Table.HeaderCell>
          <Table.HeaderCell>Terminal</Table.HeaderCell>
          <Table.HeaderCell>Crane</Table.HeaderCell>
          <Table.HeaderCell>Arrived</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {arrivals.map(arrival => {
        return (
          <>
            <Table.Row>
              <Table.Cell>{arrival.lighterName}</Table.Cell>
              <Table.Cell>{arrival.lighterCompany}</Table.Cell>
              <Table.Cell>{arrival.terminalName}</Table.Cell>
              <Table.Cell>{arrival.craneNumber}</Table.Cell>
              <Table.Cell>{arrival.arrivedTime}</Table.Cell>
            </Table.Row>
          </>
        )
      })}
      </Table.Body>
    </Table>
  );
}

export default Arrival;
