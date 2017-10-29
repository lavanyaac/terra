import React, { Component } from 'react';
import RealEstateAgency from './RealEstateAgency';
import RealEstateAgencyMap from './RealEstateAgencyMap';


class SearchResults extends Component {
  render() {
    const { dataExists, realEstateAgencies, searchAddress } = this.props; 
    return (
      !dataExists ? null :
      <div className="search-results">
        <div className="results-container">
          {
            realEstateAgencies.map((data, i) => <RealEstateAgency realEstateAgency={data} key={i}/>)
          }
        </div>
        <div className="map-container">
          <RealEstateAgencyMap mapData={realEstateAgencies}
          searchAddress={ searchAddress }/>
        </div>
      </div>
    );
  }
}

export default SearchResults;