import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Segment, Form, Input, Button, Message } from 'semantic-ui-react';

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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });




      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );

  }

  render() {
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
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <Form.Field required>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </Form.Field>

            <Form.Field required>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </Form.Field>

            <div style={{ padding: '1em 0', textAlign: 'center' }} className="buttonPanel">
              <Button
              style={{ background: '#225eff', color: 'white', width: '100%', marginRight: 'auto', marginLeft: 'auto' }}
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>
            </div>

            {this.state.message && (

                <Message negative>
                  {this.state.message}
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
}
