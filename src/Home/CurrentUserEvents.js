import React from 'react'
import {Button, Card, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {saveUserEventsAction} from '../actions';
const url = `http://localhost:3001/api/v1/users/${localStorage.id}/`

class CurrentUserEvents extends React.Component {

componentDidMount(){
  this.fetchCurrentUserEvents()
}

fetchCurrentUserEvents = () => {
    fetch(url)
    .then(response=>response.json())
    .then(userData=>{
    this.props.saveUserEvents(userData.events)
    })
}
displayCurrentUserEvents = (events) => {
  console.log(events);
  return events.map(event=>{
    return(
      <Card key={event.id} >
        <Card.Content>
          <a href={event.yelp_url} target="_blank">
            <Image floated="left" size="small" src={event.yelp_image}/>
          </a>
          <Card.Header>{event.event_name}</Card.Header>
       <Card.Meta>{event.location_name} {}</Card.Meta>
      <a href={event.maps_link}> <Card.Meta>{event.address} </Card.Meta></a>
       <Card.Description>
        {event.description}
       </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Message
          </Button>
          <Button  basic color='red'>
            Google Maps
          </Button>
        </div>
      </Card.Content>
      </Card>
    )
  })
}

  render () {
    return (

           <Card.Group id="UserEventCard">
           {this.displayCurrentUserEvents(this.props.userEvents)}
           </Card.Group>
    )
  }
}

function mapStateToProps(state){
  return{
    userEvents: state.userEvents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserEvents: (userEvents) => {
      dispatch(saveUserEventsAction(userEvents))
    }
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentUserEvents);