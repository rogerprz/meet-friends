import React,{Component} from 'react'
import EventListCard from './EventListCard';
import MessageCard from './MessageCard';
import MessageForm from './MessageForm';
// import Fetches from '../Fetches';
import {Grid, Menu, Segment, Comment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {saveUserEventsAction, onChangeChatMessageAction, activeItemAction,selectedChatEventAction, eventCommentsAction} from '../actions';
const url = `http://localhost:3001/api/v1/users/${localStorage.id}/`


class MessagesCont extends Component {
  state = { activeItem: 1 }


componentDidMount(){this.fetchData()}

fetchData = () => {
  fetch(url)
  .then(response=>response.json())
  .then(json=>{
    let activeItem = json.events[0].id.toString()
  this.props.updateActiveItem(activeItem)
  this.props.saveUserEvents(json.events)
  this.props.currentEvent(json.events[0])
  this.props.storeComments(json.events[0].comments)
  })
}
displayEventsList = (events, activeItem) => {
  console.log("active",activeItem);
  return events.map(event=>{
    return (
      <EventListCard key={event.id} {...event}
        active={activeItem===event.id.toString()}
        handleClick={this.handleClick}/>)
  })
}

displayEventComments = (events, activeItem) => {
  if (events.length === 0){return null}
  const event = events.find(event=>{
    return (event.id.toString() === activeItem && event.comments.length > 0)
    })
  if (typeof event !== "undefined"){

    return event.comments.map(comment=>{
        return (<MessageCard
            key={comment.id}
            {...comment} />)
          })
  } else { return null}
}


// handleSubmit = (e, {loadEvent}) => {
//   console.log("++++++++++++++++++++");
//   console.log("what is load event id",this.props.loadCurrentEvent);
//   debugger
//
//   const data = {
//     event_id: this.props.loadCurrentEvent.id,
//     user_id: parseInt(localStorage.id, 10),
//     comment: this.props.loadUpdatedMessage }
//   // debugger
//   e.target.message.value = ""
//   Fetches.post(url, data)
//   .then(res=>res.json())
//   .then(json=>{
//     console.log(json.comments);
//     this.props.submitEventComment(json.comments)
//   })
// }
handleInputChange = (e) => {
  this.props.onChangeChatMessage(e.target.value)
}

// handleClick = (e, { name }) => {
//   // this.props.currentEvent(this.props)
//   console.log(name);
//   this.setState({ activeItem: name })
//   // this.props.storeComments(this.props.comments)
// }
  render () {
    // const { activeItem } = this.state
    const {userEvents, activeItem} = this.props
    console.log(activeItem);
    return(
      <div id="MessagesCont">
      <Grid>
        <Grid.Column width={6} id="MessageEventsColumn">
          <Menu fluid vertical tabular >
            {this.displayEventsList(userEvents, activeItem)}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={10}>
          <Segment id='MessageCardCont'>
            <Comment.Group >
            {this.displayEventComments(userEvents, activeItem)}
          </Comment.Group>
        </Segment>
        <MessageForm
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}/>
        </Grid.Column>

      </Grid>

    </div>
    )

  }
}

function mapStateToProps(state){
  return{
    loadComments: state.eventComments,
    activeItem: state.activeItem,
    userEvents: state.userEvents,
    loadUpdatedMessage: state.onChangeChatMessage,
    loadCurrentEvent: state.selectedChatEvent

  }
}
function mapDispatchToProps(dispatch) {
  return {
    saveUserEvents: (userEvents) => {
      dispatch(saveUserEventsAction(userEvents))
    },
    storeComments: (comments) => {
      dispatch(eventCommentsAction(comments))
    },
    currentEvent: (defaultEvent) => {
      dispatch(selectedChatEventAction(defaultEvent))
    },
    onChangeChatMessage: (input) => {
      dispatch(onChangeChatMessageAction(input))
    },
    updateActiveItem: (activeEvent) => {
      dispatch(activeItemAction(activeEvent))
    }

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(MessagesCont)
