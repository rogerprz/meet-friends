export function setYelpResultsAction(results) {
  return {
    type: "YELP_RESULTS",
    payload: results
  }
}
export function selectPlaceAction(selectedBusiness) {
  return {
    type: "SELECT_EVENT",
    payload: selectedBusiness
  }
}
export function selectedChatEventAction(chatEvent) {
  return {
    type: "CURRENT_CHAT_EVENT",
    payload: chatEvent
  }
}
export function createEventAction(event) {
  return {
    type: "CREATE_EVENT",
    payload: event
  }
}
export function saveUserEventsAction(userEvents) {
  return {
    type: "USER_EVENTS",
    payload: userEvents
  }
}
export function displayFormAction(boolean) {
  return {
    type: "DISPLAY_FORM",
    payload: boolean
  }
}
export function displayNearbyEventsAction(allEvents) {
  return {
    type: "NEARBY_EVENTS",
    payload: allEvents
  }
}
export function setYelpParamsAction(yelpParams) {
  return {
    type: "YELP_PARAMS",
    payload: yelpParams
  }
}

export function profileAction(profile) {
  return {
    type: "USER_PROFILE",
    payload: profile
  }
}

export function eventDetailsAction(eventDetails) {
  return {
    type: "EVENT_DETAILS",
    payload: eventDetails
  }
}
export function eventCommentsAction(eventComments) {
  return {
    type: "EVENT_COMMENTS",
    payload: eventComments
  }
}
export function onChangeChatMessageAction(updatedMessage) {
  return {
    type: "ON_CHANGE_MESSAGE",
    payload: updatedMessage
  }
}
export function onChangeChatCommentAction(updatedComment) {
  return {
    type: "ON_CHANGE_COMMENT",
    payload: updatedComment
  }
}
export function activeItemAction(activeEvent) {
  return {
    type: "ACTIVE_EVENT",
    payload: activeEvent
  }
}
export function geolocationAction(geolocation) {
  return {
    type: "ACTIVE_EVENT",
    payload: geolocation
  }
}
