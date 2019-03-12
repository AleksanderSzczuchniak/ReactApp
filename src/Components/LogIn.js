import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import "./LogIn.css";
import { withAuth } from "../../contexts/AuthContext";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    success: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { signIn } = this.props.authContext;
    signIn(this.state.email, this.state.password)
      .then(data => {
        this.props.history.push("/dashboard");
        this.setState({ error: null, success: "Sign in successful" });
      })
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div className="LogIn">
        {this.state.error && (
          <p style={{ color: "red" }}>{this.state.error.message}</p>
        )}
        {this.state.success && (
          <p style={{ color: "green" }}>{this.state.success}</p>
        )}
        <Form size="large" onSubmit={this.handleSubmit} >
          <Form.Group widths={1}>
            <Form.Input
            icon="user"
            iconPosition="left"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              type="email"
              label="Email"
              placeholder="email"
            />
            <Form.Input 
              icon="lock"
              iconPosition="left"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              type="password"
              label="Password"
              placeholder="password"
            />
          </Form.Group>
          <Button color="purple" type="submit">Log In</Button>
        </Form>
      </div>
    );
  }
}
export default withAuth(withRouter(LogIn));