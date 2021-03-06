import React from 'react'
import {Button, Card, Image} from 'semantic-ui-react';


export function CardDetails(image, event_name, location_name, description){
  return (
    <Card.Content>
        <Image id="HomeCardImg" floated="left" size="small" src={image}/>
        <Card.Header>{event_name}</Card.Header>
        <Card.Content>
        <Card.Header>@ {location_name}</Card.Header>
        </Card.Content>
     <Card.Description>
        {description}
     </Card.Description>
    </Card.Content>
  )

}

export function CardContentButtons(url, maps, time, date, address, text){
  return (
    <Card.Content extra>
      <Card.Description floated="left">Time: {time} Date:{date}</Card.Description>
        <Card.Meta>{address} </Card.Meta>
    <div className='ui three buttons'>
      <Button href={url} target="_blank" basic color='red'>
        Yelp
      </Button>
      <Button basic color='blue'>
        {text }
      </Button>
      <Button  href={maps} target="_blank" basic color='red'>
        Google Maps
      </Button>
  </div>
</Card.Content>

)
}

export function displayUserEvents(events){
  return events.map(event=>{
    return(
      <Card key={event.id} id={event.id} >
        {CardDetails(event.yelp_image,
          event.event_name,
          event.location_name,
          event.description)}
        {CardContentButtons(
          event.yelp_url,
          event.maps_link,
          event.time,
          event.date,
          event.address,
          "Mesesage Friends",

        )}
      </Card>
    )
  })
}

export function displayNearbyEvents(events) {
  return events.map(event=>{
    return(
      <Card key={event.id} >
        {CardDetails(event.yelp_image,
          event.event_name,
          event.location,
          event.description,
        )}
        {CardContentButtons(
          event.yelp_url,
          event.maps_link,
          event.time,
          event.date,
          event.address,
          "Event Details"
        )}
      </Card>
    )
  })

}


export function displayExploreEvents(events){

  return events.map(event=>{
    return(
      <Card key={event.id} id="ExploreCard" >
        <Card.Content >
          <Image floated="left" size="small" src={event.yelp_image}/>
          <Card.Header>{event.event_name}</Card.Header>
          <Card.Meta>{event.location_name}</Card.Meta>
            <Card.Meta>
              Time: {event.time} <br/>
              Date: {event.date} <br/>
            </Card.Meta>
         <Card.Meta>{event.address} </Card.Meta>
           <Card.Description>
              {event.description} <br/>

           </Card.Description>
         <Card.Meta>{event.address} </Card.Meta>
           <div className='ui three buttons'>
             <Button href={event.yelp_url} target="_blank" basic color='red'>
               Yelp
             </Button>
             <Button basic color='blue'>
               Event Details
             </Button>
             <Button  href={event.maps_link} target="_blank" basic color='red'>
               Google Maps
             </Button>
         </div>
        </Card.Content>


      </Card>
    )
  })
}

// export function displayMessageEvents(events, click){
//   return events.map(event=>{
//     return(
//       <Card key={event.id} id={event.id} onClick={click}>
//         <Card.Content >
//         <Image floated="left" size="tiny" src={event.yelp_image}/>
//           <Card.Header>{event.event_name}</Card.Header>
//        <Card.Meta>{event.location_name}</Card.Meta>
//        <Card.Description>Time: {event.time} Date:{event.date}</Card.Description>
//        <Card.Meta>{event.address} </Card.Meta>
//      </Card.Content>
//       </Card>
//     )
//   })
// }
