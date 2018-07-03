import React, {Component} from 'react'
import PlaceCard from './PlaceCard';
import Search from './YelpSearch';
import EventForm from '../ExploreEvents/EventForm';
import {setResultsAction, displayFormAction} from '../actions';
import {connect} from 'react-redux';
import Loading from '../Helpers/Loading';
// import Fetches from "../Fetches.js";
// import YelpResults from './reducer/yelp_reducer';
const backendURL = "http://localhost:3001/api/v1/places/yelp"

class ExplorePlacesCont extends Component {
  state ={
    boolean: this.props.boolean
  }
componentDidMount(){
  this.yelpFetch()

}
yelpFetch = () => {
  fetch(backendURL)
  .then(response=>response.json())
  .then(yelp=>{
    // console.log("yelp fetch",yelp.results.businesses);
    this.props.setResults(yelp.results.businesses)
  })
}
renderYelpResults = () => {
  return this.props.results.map(place=>{
      return <PlaceCard
        className="PlaceCard"
        key={place.id}
        {...place}  />
          })
        }

  render () {
    console.log("this.boolean Exp place cont", this.props.boolean);
    console.log("this.displayForm Exp place cont", this.props.displayForm);

    return(
      <div id="ExplorePlacesCont">
        <Search />
        {(this.props.boolean) ?
            <EventForm {...this.props}/> : null
        }

        {(this.props.results === [] || this.props.results.length === 0 ) ? <Loading/> :
          <div className="ui four column grid">
            <div className="row">
              {this.renderYelpResults()}
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    results: state.results,
    displayForm: state.boolean,
    boolean: state.boolean
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setResults: (yelpArray) => {
      dispatch(setResultsAction(yelpArray))
    },
    displayForm: () => {
      dispatch(displayFormAction())
    }
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(ExplorePlacesCont);