const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('config');
const googleAPIKey = config['Google']['APIKey'];
const googleUrl = `https://maps.googleapis.com/maps/api`;
const fakeData = '[{"name":"Greenpointe Apartment Homes","place_id":"ChIJ0Rq2TUjKj4ARq4cp7urfmG0","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":2.7,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3561645,"lng":-121.9561076,"distance":6.5,"address":"1571 Warburton Ave, Santa Clara, CA 95050, USA"},{"name":"550 Moreland Apartments","place_id":"ChIJvTxWLHTJj4AR_fQ0Lro-dCA","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3955675,"lng":-121.9443982,"distance":7.2,"address":"550 Moreland Way, Santa Clara, CA 95054, USA"},{"name":"Mansion Grove Apartments","place_id":"ChIJB43ZGHXJj4AR90wGIyjFyic","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.4,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.39838930000001,"lng":-121.9444626,"distance":7.4,"address":"502 Mansion Park Dr, Santa Clara, CA 95054, USA"},{"name":"Estancia at Santa Clara Apartments","place_id":"ChIJSzuGD6PJj4ARM9czsdP6KqA","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.7,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3992916,"lng":-121.9565168,"distance":8.3,"address":"1632-1634 Hope Dr, Santa Clara, CA 95054, USA"},{"name":"Avalon Silicon Valley","place_id":"ChIJC-d4viC2j4ARERmj-jkVP_Y","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.7,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3886079,"lng":-121.9938032,"distance":9,"address":"3290-3374 Lakeside Dr, Sunnyvale, CA 94085, USA"},{"name":"Summerwood Apartments","place_id":"ChIJB6ByMvbKj4ARFAtVpAkJxbE","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.5,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.33406299999999,"lng":-121.961134,"distance":9.2,"address":"444 Saratoga Ave, Santa Clara, CA 95050, USA"},{"name":"Avalon at Cahill Park","place_id":"ChIJ0wyO1VjLj4ARroIvJs7Lu2E","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4.6,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.331571,"lng":-121.9051834,"distance":11.100000000000001,"address":"754 The Alameda, San Jose, CA 95126, USA"},{"name":"Spring Creek Apartments","place_id":"ChIJ9RA2E43Kj4ARQnoO-cHW-sA","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.5,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3254513,"lng":-121.9719275,"distance":11.299999999999999,"address":"100 Buckingham Dr, Santa Clara, CA 95051, USA"},{"name":"Creative Real Estate Solutions","place_id":"ChIJgf1_An7Lj4ARS6fyrEl9Bvc","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3504222,"lng":-121.9016621,"distance":11.7,"address":"777 N 1st St, San Jose, CA 95112, USA"},{"name":"City Gate at Cupertino Apartments","place_id":"ChIJb7JAUXi1j4ARW-PSzEkGsUw","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3221417,"lng":-122.0018273,"distance":13.100000000000001,"address":"5636 Stevens Creek Blvd, Cupertino, CA 95014, USA"},{"name":"Kensington Place Apartments","place_id":"ChIJN-Q-qc63j4AR-NaZVXuE2dk","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4.6,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.4043999,"lng":-122.0084875,"distance":14,"address":"Kensington Pl, Sunnyvale, CA 94089, USA"},{"name":"San Jose Executive Center","place_id":"ChIJbxSbpqTMj4AR_KYn_IS3nYY","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4.5,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.33377600000001,"lng":-121.8913612,"distance":14.5,"address":"123 W San Fernando St, San Jose, CA 95113, USA"},{"name":"The Markham Apartments","place_id":"ChIJI4plUsu1j4ARlTCQ3mxm77c","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.3,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3358853,"lng":-122.0388738,"distance":16.1,"address":"20800 Homestead Rd, Cupertino, CA 95014, USA"},{"name":"Sara Greenwood Real Estate","place_id":"ChIJnaQiB3szjoAR3E72poJV3bA","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.30814900000001,"lng":-121.90058,"distance":16.7,"address":"1110-1126 Lincoln Ave, San Jose, CA 95125, USA"},{"name":"Equity Office Management","place_id":"ChIJ0ZvBZ8I0joAR1MYw-liiFCQ","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","lat":37.2880792,"lng":-121.9333194,"distance":17,"address":"1875 S Bascom Ave, Campbell, CA 95008, USA"},{"name":"Coldwell Banker Residential Brokerage","place_id":"ChIJjyEIJJg0joARNv2j-zjkiso","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.292429,"lng":-121.9126144,"distance":17.1,"address":"1702 Meridian Ave, San Jose, CA 95125, USA"},{"name":"Mill Creek Apartments","place_id":"ChIJUVqzULvIj4ARjq_RfhRJXcs","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.8,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.45431749999999,"lng":-121.9188277,"distance":19.799999999999997,"address":"448-472 Dixon Landing Rd, Milpitas, CA 95035, USA"},{"name":"Sierrabrook Apartments","place_id":"ChIJiUa80zDMj4AR6FNkjys1WCI","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":2.4,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3893733,"lng":-121.8651152,"distance":20,"address":"2401 Old Ridge Ct, San Jose, CA 95132, USA"},{"name":"Park Place Apartments","place_id":"ChIJ20Ok0Mywj4AR0Ugc7wjSl54","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":3.8,"opening_hours":{"open_now":true,"weekday_text":[]},"lat":37.3890691,"lng":-122.0844361,"distance":20.299999999999997,"address":"600-650 Franklin St, Mountain View, CA 94041, USA"},{"name":"Avalon Mountain View","place_id":"ChIJfYitT7Swj4ARqlGv4vl-YYc","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4.1,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3980977,"lng":-122.0873254,"distance":20.3,"address":"1600 Villa St, Mountain View, CA 94041, USA"},{"name":"eaves Creekside","place_id":"ChIJO7afMCW3j4AR9E2cTuZRRvw","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","rating":4.1,"opening_hours":{"open_now":false,"weekday_text":[]},"lat":37.3909859,"lng":-122.0717344,"distance":21.1,"address":"151 Calderon Ave, Mountain View, CA 94041, USA"}]';

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
});

app.get('/test', function (req, res) {
  res.send(fakeData);
})

app.get('/locations', function (req, res) {
  const firstLocation = req.query['first_loc'];
  const secondLocation = req.query['second_loc'];
  const realEstateAgencies = [];
  let destinations = '';
  let destinationOrder = [];

  const firstList = getRealEstateAgencies(firstLocation);
  const secondList = getRealEstateAgencies(secondLocation);

  Promise.all([firstList, secondList])
  .then(values => {
  	
  	for(const row of values){
  		for(const data of row.data.results){
  			// console.log(data);
  			const val = {
  				'name': data.name, 
  				'place_id':data.place_id, 
  				'icon': data.icon,
  				'rating': data.rating,
  				'opening_hours': data.opening_hours,
  				'lat': data.geometry.location.lat,
  				'lng': data.geometry.location.lng,
  				'distance':0

  			}
  			if(!valueExists(realEstateAgencies, val)){
  				realEstateAgencies.push(val);
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
  		console.log(k.data);
  		const rows = k.data.rows[0].elements;
  		const destinations = k.data.destination_addresses; 
  		for(const[index, distanceRow] of rows.entries()){
  			realEstateAgencies[index]['distance'] += parseFloat(distanceRow.distance.text.split(' ')[0]);
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
  
});


app.get('/map', function (req, res) {
	axios.get(`${googleUrl}/js?key=${googleAPIKey}&libraries=places`)
		.then(results => {
			res.send(results.data);
		})
		.catch(error => {
			console.error(error);
		});
});

function valueExists(source, val){
	return source.some(item => {
		return item.place_id === val.place_id;
	})
}

function getRealEstateAgencies(latlng){
	return axios.get(`${googleUrl}/place/nearbysearch/json?location=${latlng}\
		&type=real_estate_agency&radius=16093.5&key=${googleAPIKey}`)
}

function getDistance(origin, destination){
	return axios.get(`${googleUrl}/distancematrix/json?units=imperial&origins=${origin}\
		&destinations=${destination}&key=${googleAPIKey}`)
}


app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})