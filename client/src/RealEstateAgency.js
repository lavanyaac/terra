import React, { Component } from 'react';

class SearchResults extends Component {
  convertRatingToClassName(rating){
    if(rating <1.5){
      return "one";
    }else if (rating >=1.5 && rating<2){
      return "onehalf";
    }else if (rating >=2 && rating<2.5){
      return "two";
    }else if (rating >=2.5 && rating<3){
      return "twohalf";
    }else if (rating >=3 && rating<3.5){
      return "three";
    }else if (rating >=3.5 && rating<4){
      return "threehalf";
    }else if (rating >=4 && rating<4.5){
      return "four";
    }else if (rating >=4.5 && rating<5){
      return "fourhalf";
    }else{
      return "";
    }
  }

  render() {
    const { realEstateAgency,index } = this.props; 
    return (
      !realEstateAgency? null :
      <div className="real-estate-agency">
        <div className="text-container">
          <p className="REA-name">{index+1}. {realEstateAgency.name}</p>
          <p className="REA-address">{realEstateAgency.address}</p>
          <p className={"ratings "+this.convertRatingToClassName(parseFloat(realEstateAgency.rating))} ></p>
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