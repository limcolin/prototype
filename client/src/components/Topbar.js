import React from "react";
import 'semantic-ui-css/semantic.min.css';
import { Menu, Label, Image, Icon, Dropdown, Button } from 'semantic-ui-react';
import GoogleFontLoader from 'react-google-font-loader';
import { Link } from "react-router-dom";

const Topbar = ({ currentUser, logout }) => {
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Exo',
            weights: [900],
          }
        ]}
      />
      <Menu style={{
        borderTop: "3px solid rgb(50, 67, 84) 100%)",
        height: '70px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 4px 0px, rgba(0, 0, 0, 0.05) 0px 2px',
        boxShadow: '#4a4a4acf 0px 3px 10px 3px',
        background: '#fafafb',
        background: "linear-gradient(87deg, rgba(38,44,52,1) 0%, rgba(50,67,84,1) 100%)"
      }} inverted borderless fixed="top">
        <Menu.Menu position="left">
          <Menu.Item style={{ fontFamily: 'Exo', fontWeight: 900, fontSize: "20px" }} name="/">
            <Label style={{ top: "6px", left: "141px", fontSize: "8px" }} ribbon="right" color='blue' floating>Beta</Label>
            portlight<span style={{ color: "#FA5959" }} >></span>
          </Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="/">|</Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="/">Why Portlight?</Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="features">Features</Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="pricing">Pricing</Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="features">Company</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item as='a'>
            <Icon name='comment' />
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='bell' />
          </Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="help">Help</Menu.Item>
          <Menu.Item style={{ fontWeight: 700 }} name="/">|</Menu.Item>

          {currentUser ? (
            <>
              <Menu.Item style={{ fontWeight: 700 }} name="account">
                <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' avatar />
                {currentUser.username}
                <Dropdown>
                  <Dropdown.Menu style={{ background: '#324354' }}>
                    <Dropdown.Item name="profile" content="Profile">
                      <Link to={"/profile"}>
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item name="logout" content="Logout">
                      <a href="/" onClick={logout}>
                        Logout
                      </a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item name="login">
                <Link to={"/login"}>
                  Login
                </Link>
              </Menu.Item>

              <Menu.Item name="register">
                <Button style={{ background: '#FA5959', color: 'white' }} as={Link} to={"/register"}>
                  Sign Up
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default Topbar
