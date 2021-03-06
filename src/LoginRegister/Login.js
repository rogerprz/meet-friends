import React, {Component} from 'react'
import { Form, Input, Button } from 'semantic-ui-react';
import Fetches from './../Fetches.js';
import { connect } from 'react-redux';
import { saveUserEventsAction } from '../actions';

let URL = `${process.env.REACT_APP_BACKEND_URL}sessions`


class Login extends Component{
     constructor(){
        super();
        this.state={
          email: "",
          password: "",

        }
    }
    handleSubmit = (e) => {
    e.preventDefault();
    const body = this.state

    Fetches.post(URL,body)
    .then(response=>response.json())
    .then(json => {
      if (json.status === "accepted") {
        localStorage.setItem('token', json.token)
        localStorage.setItem('id', json.id)
        this.props.saveUserEvents(json.events)
        this.props.history.push("/")
      }
      else{
        alert("incorrect login creds! Try again")
      }
    })
  }
  handleChange = (e) => {
      this.setState({[e.target.name] : e.target.value})
  }

    render() {
        return (
            <div id="login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field
                      onChange={this.handleChange}
                        control={Input}
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"/>
                    <Form.Field
                      onChange={this.handleChange}
                        control={Input}
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"/>
                    <Form.Field id="loginButton" control={Button}>Login</Form.Field>

                </Form>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//   return {
//     email: state.email,
//     password: state.email
//   }
// }
function mapDispatchToProps(dispatch) {
  return {
    saveUserEvents: (userEvents) => {
      dispatch(saveUserEventsAction(userEvents))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
