import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {adultAge} from '../Helpers/date';
import {Form, Input, Button, Select} from 'semantic-ui-react';
import Fetches from './../Fetches.js';
import avatars from './../Helpers/avatars';

let URL = `${process.env.REACT_APP_BACKEND_URL}api/v1/users`
const options = [
  {id: "other",key: 'o', text: 'Other', value: 'other'},
  {id: "male",key: 'm',text: 'Male',value: 'male'},
  {id: "female",key: 'f',text: 'Female',value: 'female'}
  ]

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      verifyPassword: "",
      gender: "other",
      birthday: adultAge(),
      avatar: "bird"
    }
  }

  handleChange = (e, {name, value}) => {
       if (typeof(e.target.name) === "undefined"){
         this.setState({[name]: value})
         }
       else {
         this.setState({[e.target.name] : e.target.value})
      }
  }
  handleSubmit = (e,{password, verifyPassword}) => {
    e.preventDefault()
    let check = e.target
    console.log("state", this.state);
    debugger;
    if (check.password.value !== check.verifyPassword.value){
      check.password.value = ""
      check.verifyPassword.value = ""
      return alert("Passwords do not match. Please re-enter password")
    }
    else {
      const body = this.state

      Fetches.post(URL, body)
      .then(response => response.json())
      .then(json => {
        if (json.status === "accepted"){
          localStorage.setItem('token', json.token);
          localStorage.setItem('id', json.id);
          this.props.history.push("/")
        } else if (json.status === "conflict") {
          alert("User already exists. Try loggin in.")
        }
        else{
          alert("Please fill in all fields.")
        }
      })
    }
  }
  render() {

    return (
      <div id="register">
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field required control={Input} onChange={this.handleChange} width={8} label="First Name" type="text" name="first_name" placeholder="First Name"/>
          <Form.Field required control={Input} onChange={this.handleChange} width={8} label="Last Name" type="text" name="last_name" placeholder="Last Name"/>
        </Form.Group>

        <Form.Group>
          <Form.Field required
            width={10}
            control={Input} onChange={this.handleChange} label="Email" type="email" name="email" placeholder="Enter Email"/>
          <Form.Select id="avatarReg"
            required
            width={6}
            fluid
            onChange={this.handleChange}
            control={Select}
            name="gender"
            label='Choose an Avatar'
            options={avatars()}
            placeholder=' '/>
        </Form.Group>

        <Form.Group>
          <Form.Field required control={Input} width={8} onChange={this.handleChange} label="Password" type="password" name="password" placeholder="Enter Password"/>

          <Form.Field control={Input} required width={8} onChange={this.handleChange} label="Verify Password" type="password" name="verifyPassword" placeholder="Re-Enter Password"/>
        </Form.Group>

        <Form.Group>
          <Form.Field required id="formDate"  onChange={this.handleChange} defaultValue={this.state.birthday} width={8} control={Input} name="birthday" type="date" label='Birthday'></Form.Field>
          <Form.Field required width={8} onChange={this.handleChange} control={Select} name="gender" label='Gender' options={options} placeholder='Gender'/>

        </Form.Group>
        <Form.Field id="registerButton" control={Button}>Register</Form.Field>

      </Form>

    </div>);
  }
}

export default Register;


// <Form.Field required="required" control={Input} onChange={this.handleChange} label="Phone" type="phone" name="phone" placeholder="555-555-5555"/>
// <Form.Field id="resetButton"
//     type="reset"
//     control={Button}>Reset </Form.Field>
