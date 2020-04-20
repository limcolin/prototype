import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';

const Arrival = ({ arrivals }) => {

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Lighter Name</Table.Cell>
          <Table.Cell>Lighter Company</Table.Cell>
          <Table.Cell>Crane</Table.Cell>
          <Table.Cell>Arrived</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {arrivals.map(arrival => {
        return (
          <>
            <Table.Row>
              <Table.Cell>{arrival.lighterName}</Table.Cell>
              <Table.Cell>{arrival.lighterCompany}</Table.Cell>
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
