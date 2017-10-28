import React, { Component } from 'react';
import RealEstateAgency from './RealEstateAgency';

class SearchResults extends Component {
  render() {
    const { dataExists, realEstateAgencies } = this.props; 
    console.log(dataExists, realEstateAgencies)
    return (
      !dataExists ? null :
      <div className="search-results">
        <header className="section-header">
          <h1 className="section-title">Search Results</h1>
        </header>
        <div className="results-container">
          {
            realEstateAgencies.map((data, i) => <RealEstateAgency realEstateAgency={data} key={i}/>)
          }
        </div>
      </div>
    );
  }
}

export default SearchResults;