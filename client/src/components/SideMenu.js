import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const SideMenu = () => {

  return (
    <Menu
      icon='labeled'
      vertical
      width='very thin'
      fixed='left'
      style={{
        width: '90px',
        marginTop: '70px',
      }}
    >
      <Menu.Item as={Link} to='/'>
        <Icon name='dashboard' />
        Overview
      </Menu.Item>
      <Menu.Item as={Link} to='/bookings'>
        <Icon name='pallet' />
        Requests
      </Menu.Item>
      <Menu.Item as={Link} to='/arrivals'>
        <Icon name='ship' />
        Arrivals
      </Menu.Item>
      <Menu.Item disabled as='a'>
        <Icon name='shipping fast' />
        Shipments
      </Menu.Item>
      <Menu.Item disabled as='a'>
        <Icon name='credit card' />
        Billing
      </Menu.Item>
      <Menu.Item disabled as='a'>
        <Icon name='chart bar' />
        Analytics
      </Menu.Item>
      <Menu.Item disabled as='a'>
        <Icon name='search' />
        Search
      </Menu.Item>
    </Menu>
  )
}

export default SideMenu
