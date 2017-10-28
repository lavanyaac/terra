import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    const { realEstateAgency } = this.props; 
    return (
      !realEstateAgency? null :
      <div className="real-estate-agency">
        <p className="REA-name">{realEstateAgency.name}</p>
        <p className="REA-address">{realEstateAgency.address}</p>
        <p className="REA-distance">{realEstateAgency.distance}</p>
        <p className="REA-rating">{realEstateAgency.rating}</p>
      </div>
    );
  }
}

export default SearchResults;