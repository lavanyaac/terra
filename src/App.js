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
  updateRealEstateAgencies(data){
    this.setState({
      realEstateAgencies: data
    })
  }
  render() {
    const { realEstateAgencies } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Terra</h1>
        </header>
        <section>
          <SearchForm updateRealEstateAgencies={this.updateRealEstateAgencies.bind(this)}/>
          <SearchResults 
          dataExists={realEstateAgencies.length === 0 ? false: true }
          realEstateAgencies={this.state.realEstateAgencies}/>
        </section>
      </div>
    );
  }
}

export default App;
