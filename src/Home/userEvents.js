import React from 'react'
// import PropTypes from 'prop-types'
import {Menu, Segment} from 'semantic-ui-react';

class UserEvents extends React.Component {
  state = { activeItem: 'home' }

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <div id="UserEvents">
          <Menu pointing>
           <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
           <Menu.Item
             name='messages'
             active={activeItem === 'messages'}
             onClick={this.handleItemClick}
           />
           <Menu.Item
             name='friends'
             active={activeItem === 'friends'}
             onClick={this.handleItemClick}
           />

         </Menu>

         <Segment>
           Segment

         </Segment>
      </div>
    )

  }
}

export default UserEvents;