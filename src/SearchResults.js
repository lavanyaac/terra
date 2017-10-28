import React, { Component } from 'react';
import './App.css';

class SearchResults extends Component {
  render() {
    const { dataExists } = this.props; 
    return (
      !dataExists ? null :
      <div className="search-results">
        <header className="section-header">
          <h1 className="section-title">Search Results</h1>
        </header>
      </div>
    );
  }
}

export default SearchResults;