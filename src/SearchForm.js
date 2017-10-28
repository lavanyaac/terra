import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// const config = require('config');
const google = window.google;

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      first_location: "",
      second_loation: ""
    }
    this._firstAutocomplete=null;
    this._secondAutocomplete=null;
  }
  componentDidMount(){
    var options = {
      componentRestrictions: {'country':'us'},
      types: ['geocode'] 
    };

    this._firstAutocomplete = new google.maps.places.Autocomplete(this.inputFirst, options);
    this._secondAutocomplete = new google.maps.places.Autocomplete(this.inputSecond, options);

  }

  handleGoButtonClick(){
    const firstLatLng = this._getLatLng(this._firstAutocomplete);
    const secondLatLng = this._getLatLng(this._secondAutocomplete);
    axios.get('http://localhost:3001/locations?first_loc=' +firstLatLng+'&second_loc='+secondLatLng)
    .then(response => {
      this.props.updateRealEstateAgencies(response.data)
    })
    .catch(error => {
      console.log("Error when fetching real estate agencies data");
      console.error(error);
    });
  }

  _getLatLng(autocompleteObj){
    const location = autocompleteObj.getPlace();
    const lat = location['geometry']['location'].lat();
    const lng = location['geometry']['location'].lng();
    return [lat, lng];
  }

  render() {
    return (
      <div className="search-real-estate-agencies">
        <header className="section-header">
          <h1 className="section-title">Search Form</h1>
        </header>
        <div role="search">
          <label htmlFor="first_location">First Location
          <input id="first_location" 
          type="text" 
          placeholder="Enter first address"
          autoFocus="true"
          ref={(ref)=> this.inputFirst = ref}>
          </input>
          <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
          </label>
          <label htmlFor="second_location">Second Location
          <input id="second_location" 
          type="text" 
          placeholder="Enter second address"
          ref={(ref)=> this.inputSecond = ref}/>
          <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
          </label>
          <button className="go_btn" onClick={this.handleGoButtonClick.bind(this)}>Go</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;