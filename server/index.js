const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('config');
const googleAPIKey = config['Google']['APIKey'];
const googleUrl = `https://maps.googleapis.com/maps/api`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/location', function (req, res) {
  res.send("Hello World");
})

app.get('/locations', function (req, res) {
  const firstLocation = req.query['first_loc'];
  const secondLocation = req.query['second_loc'];
  console.log(firstLocation, secondLocation);
  const firstList = getRealEstateAgencies(firstLocation);
  const secondList = getRealEstateAgencies(secondLocation);
  const realEstateAgencies = [];
  let destinations = '';
  Promise.all([firstList, secondList])
  .then(values => {
  	for(const row of values){
  		for(const data of row.data.results){
  			if(!realEstateAgencies[data.place_id]){
  				realEstateAgencies.push({'name': data.name, 'place_id':data.place_id, 'distance':0});
  				destinations += `${data.geometry.location.lat},${data.geometry.location.lng}|`;
  			}
  		}
  	}
  	destinations = destinations.substr(0, destinations.length-1);
  	const firstDistList = getDistance(firstLocation, destinations);
  	const secondDistList = getDistance(secondLocation, destinations);
  	return Promise.all([firstDistList, secondDistList])
  })
  .then(values => {
  	for(const k of values){
  		const rows = k.data.rows[0].elements;
  		const destinations = k.data.destination_addresses;
  		for(const[index, distanceRow] of rows.entries()){
  			realEstateAgencies[index]['distance'] += parseFloat(distanceRow.distance.text.split( )[0]);
  			realEstateAgencies[index]['address'] = destinations[index];
  		}
  	}
  	realEstateAgencies.sort(function(a,b){
  		return a.distance - b.distance;
  	})
  	res.status(200).send(realEstateAgencies);
  })
  .catch(error => {
  	console.error(error);
  });
  
})

function getRealEstateAgencies(latlng){
	return axios.get(`${googleUrl}/place/nearbysearch/json?location=${latlng}\
		&type=real_estate_agency&rankby=distance&key=${googleAPIKey}`)
}

function getDistance(origin, destination){
	return axios.get(`${googleUrl}/distancematrix/json?units=imperial&origins=${origin}\
		&destinations=${destination}&key=${googleAPIKey}`)
}


app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})