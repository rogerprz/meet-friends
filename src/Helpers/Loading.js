import React from 'react'
import { Image} from 'semantic-ui-react'
const batman = require('./../Assets/BatmanLoading.gif')

const Loading = (props) => {
  return (
    <div id="Loading">
        <Image centered src={batman} />


    </div>
  )
}

export default Loading

// <Loader size='large'>Loading</Loader>
