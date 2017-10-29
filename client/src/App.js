import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      realEstateAgencies: [],
      firstLatLng: '',
      secondLatLng: ''
    }
  }
  updateRealEstateAgencies(data){
    this.setState({
      realEstateAgencies: data
    })
  }

  updateSearchAddresses(firstLatLng, secondLatLng){
    this.setState({
      firstLatLng: firstLatLng,
      secondLatLng: secondLatLng
    })
  }

  render() {
    const { realEstateAgencies, firstLatLng,  secondLatLng} = this.state;
    return (
      <div className="App">
        <header className="top-bar">
          <div className="App-header">
            <div className="logo-container">
              <img src="/images/terra-logo.png"/>
            </div>
          </div>
        </header>
        <section>
          <SearchForm 
          updateRealEstateAgencies={this.updateRealEstateAgencies.bind(this)}
          updateSearchAddresses={this.updateSearchAddresses.bind(this)}/>
          <SearchResults 
          dataExists={realEstateAgencies.length === 0 ? false: true }
          realEstateAgencies={realEstateAgencies}
          searchAddress={[firstLatLng, secondLatLng]}/>
        </section>
      </div>
    );
  }
}

export default App;
