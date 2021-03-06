import React,{Component} from 'react'
import {Menu, Segment, Card} from 'semantic-ui-react';
import CurrentNearbyEvents from './CurrentNearbyEvents';

class NearbyEventsCont extends Component {
  state = { activeItem: 'nearbyEvents' }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <div className="HomeDisplayCont">
          <Menu pointing>
           <Menu.Item name='nearbyEvents' active={activeItem === 'nearbyEvents'} onClick={this.handleItemClick} />
           <Menu.Item
             disabled
             name='bars'
             active={activeItem === 'bars'}
             onClick={this.handleItemClick}
           />
           <Menu.Item
             disabled
             name='Restaurants'
             active={activeItem === 'Restaurants'}
             onClick={this.handleItemClick}
           />

         </Menu>

         <Segment>
           <Card.Group>
           <CurrentNearbyEvents/>
           </Card.Group>

         </Segment>
      </div>
    )

  }
}

export default NearbyEventsCont;
