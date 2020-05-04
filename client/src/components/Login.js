import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Segment, Form, Input, Button, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import AuthService from "../utils/authService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = ({
  username, setUsername,
  password, setPassword,
  message, setMessage,
  loading, setLoading,
  setCurrentUser
}) => {

  const onChangeUsername = e => {
    setUsername(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  let history = useHistory()

  const handleLogin = e => {
    e.preventDefault();

    setLoading(true)
    setMessage("")

    AuthService.login(username, password).then(
      () => {
        const user = AuthService.getCurrentUser();
        if (user) {
          setCurrentUser(AuthService.getCurrentUser())
        }
        history.push("/");
        //window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false)
        setMessage(resMessage)
      }
    );

  }

  return (
    <div style={{ padding: '60px', minHeight: 'calc(100vh - 90px)' }}>
    <Segment style={{ border: '1px solid #324354', boxShadow: '3px 3px 7px 3px rgba(34,36,38,.15)', borderRadius: '8px', padding: 0, left: '50%', position: 'fixed', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
    <Card.Group centered>
      <Card>
        <Card.Header>
Sign in to your Portlight dashboard.
        </Card.Header>
<Card.Content>
        <Form
          onSubmit={handleLogin}
        >
          <Form.Field required>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </Form.Field>

          <div style={{ padding: '1em 0', textAlign: 'center' }} className="buttonPanel">
            <Button
            style={{ background: '#225eff', color: 'white', width: '100%', marginRight: 'auto', marginLeft: 'auto' }}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </Button>
          </div>

          {message && (

              <Message negative>
                {message}
              </Message>

          )}

        </Form>
        </Card.Content>
        <Card.Content extra>
Don't have a Portlight account yet? Sign up. <br />
Need help? Contact our help team.
        </Card.Content>
      </Card>
    </Card.Group>
    </Segment>
    </div>
  );

}

export default Login
