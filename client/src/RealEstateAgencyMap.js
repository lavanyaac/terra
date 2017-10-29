import React, { Component } from 'react';
import axios from 'axios';
const google = window.google;


class RealEstateAgencyMap extends Component {

	initMap() {
    var myLatLng = {lat: 37.331571, lng: -121.9051834};

    console.log("NO NO NO NO No", this.map);
    var map = new google.maps.Map(this.map, {
      zoom: 11,
      center: {lat: 37.331571, lng: -121.9051834}
    });
    const image = "/map-marker-amne5.png"
    for(const point of this.props.mapData){
	    var marker = new google.maps.Marker({
	      position: {lat: point.lat, lng: point.lng},
	      map: map,
	      title: point.name,
	      icon: image
	    });
		}

  }
  componentDidMount(){
  	this.initMap();
  }

  render() {
    const { dataExists, realEstateAgencies } = this.props; 

    return (
      <div className="real-estate-agency-map">
        <header className="section-header">
          <h1 className="section-title">Map Area</h1>
        </header>
        <div id="map"
        ref={(ref)=> this.map = ref}>
        </div>
      </div>
    );
  }
}

export default RealEstateAgencyMap;