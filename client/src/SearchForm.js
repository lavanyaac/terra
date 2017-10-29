import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
const google = window.google;

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      first_location: "",
      second_location: "",
      invalid_first_address:false,
      invalid_second_address:false
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
    if(!firstLatLng){
      this.setState({
        invalid_first_address:true
      });
    }else{
      this.setState({
        invalid_first_address:false
      });
    }
    if(!secondLatLng){
      this.setState({
        invalid_second_address:true
      });
    }else{
      this.setState({
        invalid_second_address:false
      });
    }
    if(firstLatLng && secondLatLng){
      const url=`/locations?first_loc=${firstLatLng}&second_loc=${secondLatLng}`;
      axios.get(url)
          .then(response => {
            this.props.updateSearchAddresses(firstLatLng,secondLatLng);
            this.props.updateRealEstateAgencies(response.data);
          })
          .catch(error => {
            console.log("Error when fetching real estate agencies data");
            console.error(error);
          });
    }
  }

  _getLatLng(autocompleteObj){
    const location = autocompleteObj.getPlace();
    if(!location){
      return;
    }
    const lat = location['geometry']['location'].lat();
    const lng = location['geometry']['location'].lng();
    return [lat, lng];
  }

  render() {
    return (
      <div className="search-real-estate-agencies">
      <p>Find real estate agencies near you.</p>
        <label htmlFor="first_location">
          <input id="first_location" 
          type="text" 
          required="true"
          placeholder="Enter first address"
          autoFocus="true"
          ref={(ref)=> this.inputFirst = ref}>
          </input>
          <span className={this.state.invalid_first_address ? "error-msg":"error-msg hidden-error-msg"}>Please enter an address.</span>
          <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
        </label>
        <label htmlFor="second_location">
          <input id="second_location" 
          type="text" 
          required="true"
          placeholder="Enter second address"
          ref={(ref)=> this.inputSecond = ref}/>
          <span className={this.state.invalid_second_address ? "error-msg":"error-msg hidden-error-msg"}>Please enter an address.</span>
          <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
          </label>
          <button className="go_btn" onClick={this.handleGoButtonClick.bind(this)}>Go</button>
      </div>
    );
  }
}

export default SearchForm;