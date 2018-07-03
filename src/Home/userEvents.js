import React from 'react'
import {Menu, Segment, Button, Card, Image} from 'semantic-ui-react';
// import Fetches from "../Fetches.js";
import {connect} from 'react-redux';
import {saveUserEventsAction} from '../actions';

const url = `http://localhost:3001/api/v1/users/${localStorage.id}/`

class UserEvents extends React.Component {
  state = { activeItem: 'currentEvents' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

componentDidMount(){
  this.fetchUserEvents()
}


fetchUserEvents = () => {
  console.log("whati is ",localStorage);
    fetch(url)
    .then(response=>response.json())
    .then(userData=>{
      console.log("user fetch",userData)
    this.props.saveUserEvents(userData.events)
    })
}
displayUserEvents = (events) => {
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
    const { activeItem } = this.state
    console.log("PROPS props", this.props);
    return (
      <div id="UserEvents">
          <Menu pointing>
           <Menu.Item name='currentEvents' active={activeItem === 'currentEvents'} onClick={this.handleItemClick} />
           <Menu.Item
             name='savedEvents'
             active={activeItem === 'savedEvents'}
             onClick={this.handleItemClick}
           />
           <Menu.Item
             name='pastEvents'
             active={activeItem === 'pastEvents'}
             onClick={this.handleItemClick}
           />

         </Menu>

         <Segment>
           <Card.Group id="UserEventCard">
           {this.displayUserEvents(this.props.userEvents)}
         </Card.Group>
         </Segment>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(UserEvents);
