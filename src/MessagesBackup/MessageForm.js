import React,{Component} from 'react'
import {connect} from 'react-redux';
import {eventCommentsAction, onChangeChatMessageAction} from '../actions';
import {Form, Button} from 'semantic-ui-react';
import Fetches from '../Fetches';
let url =`${process.env.REACT_APP_BACKEND_URL}api/v1/comments`

class MessageForm extends Component{

handleSubmit = (e) => {
  e.preventDefault()
  console.log('activeItem', this.props.activeItem);

  const data = {
    event_id: this.props.loadEvent.id,
    user_id: parseInt(localStorage.id, 10),
    comment: this.props.loadUpdatedMessage
  }
  console.log('data', data);

  e.target.message.value = ""
  Fetches.post(url, data)
  .then(res=>res.json())
  .then(json=>{
    console.log(json.comments);
    debugger
    this.props.updateComments(json.comments)
  })

}

  render(){

    return (
      <Form onSubmit={this.handleSubmit} reply id="MessageForm">
       <Form.TextArea onChange={this.props.handleInputChange} name="message" id="FormTextArea"/>
       <Button content='New Comment' labelPosition='left' icon='edit' primary />
     </Form>

    )
  }

}
function mapStateToProps(state){
  return{
    loadEvent: state.selectedChatEvent,
    loadUpdatedMessage: state.onChangeChatMessage
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateComments: (comments) => {
      dispatch(eventCommentsAction(comments))
    },
    onChangeChatMessage: (comment) => {
      dispatch(onChangeChatMessageAction(comment))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageForm)
