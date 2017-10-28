import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      realEstateAgencies: []
    }
  }
  render() {
    const { realEstateAgencies } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Terra</h1>
        </header>
        <section>
          <SearchForm/>
          <SearchResults 
          dataExists={realEstateAgencies.length === 0 ? false: true }/>
        </section>
      </div>
    );
  }
}

export default App;
