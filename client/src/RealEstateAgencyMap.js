import React, { Component } from 'react';
import mapcolor from './configdata/mapcolor';
const google = window.google;


class RealEstateAgencyMap extends Component {

	initMap(latLng) {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;

    const firstLatLng = {lat: latLng[0][0], lng: latLng[0][1], name: 'First Location'};
    const secondLatLng = {lat: latLng[1][0], lng: latLng[1][1], name: 'Second Location'};

    const styledMapType = new google.maps.StyledMapType(mapcolor,{name: 'Styled Map'});

    const map = new google.maps.Map(this.map, {
      zoom: 11,
      center: firstLatLng,
      mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    const addressMarkerImage = "/images/map-marker-address-for-label.png";
    for(const point of [firstLatLng, secondLatLng]){
      const marker = new google.maps.Marker({
        position: {lat: point.lat, lng: point.lng},
        map: map,
        title: point.name,
        icon: {
          url:addressMarkerImage
        },
          label:{
          text: labels[labelIndex++ % labels.length],
        color: 'white',
        fontSize: "12px"
        }
        
      });
      marker.setMap(map);
    }

    const markerImage = "/images/map-marker.png";
    for(const [i,point] of this.props.mapData.entries()){
	    const marker = new google.maps.Marker({
	      position: {lat: point.lat, lng: point.lng},
	      map: map,
	      title: point.name,
        label:{
          text: (i+1).toString(),
        color: 'white',
        fontSize: "12px"
        },
        
	      icon: {
          url:markerImage
        },
	    });
      marker.setMap(map);
		}

    // google.maps.event.addDomListener(window, "resize", function() {
    //   var center = map.getCenter();
    //   google.maps.event.trigger(map, "resize");
    //   map.setCenter(center);
    //   });
  }

  componentDidMount(){
    
    this.initMap(this.props.searchAddress);
  }

  componentDidUpdate(){
    
  	this.initMap(this.props.searchAddress);
  }

  render() {
    
    return (
      <div className="real-estate-agency-map">
        <div id="map"
        ref={(ref)=> this.map = ref}>
        </div>
      </div>
    );
  }
}

export default RealEstateAgencyMap;