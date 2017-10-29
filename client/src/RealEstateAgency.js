import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    const { realEstateAgency } = this.props; 
    return (
      !realEstateAgency? null :
      <div className="real-estate-agency">
        <div className="text-container">
          <p className="REA-name">{realEstateAgency.name}</p>
          <p className="REA-address">{realEstateAgency.address}</p>
          <p className="REA-rating">{realEstateAgency.rating}</p>
        </div>
        <div className="distance-container">
          <p className="REA-distance">{parseFloat(realEstateAgency.distance).toFixed(1)}</p>
          <p className="REA-distance-label">miles</p>
        </div>
        
        
      </div>
    );
  }
}

export default SearchResults;