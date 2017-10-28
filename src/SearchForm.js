import React, { Component } from 'react';
import './App.css';
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

  render() {
    return (
      <div className="search-real-estate-agencies">
        <header className="section-header">
          <h1 className="section-title">Search Form</h1>
        </header>
        <form role="search">
          <label for="first_location">First Location
          <input id="first_location" 
          type="text" 
          placeholder="Enter first address"
          autoFocus="true"
          ref={(ref)=> this.inputFirst = ref}>
          </input>
          <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
          </label>
          <label for="second_location">Second Location
          <input id="second_location" 
          type="text" 
          placeholder="Enter second address"
          ref={(ref)=> this.inputSecond = ref}/>
          <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
          </label>
          <button className="go_btn">Go</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;