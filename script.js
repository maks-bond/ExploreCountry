/* global $ */

var airports = airportData.airports;
var countries = [];
var countryInfo = {};
function populateCountries(){
    for (var i = 0; i<airports.length; ++i) {
        var airport = airports[i];
        var country = airport.country;
        if(!countryInfo[country]) {
            countryInfo[country] = {};
            countryInfo[country].cities = [];
        }
        countryInfo[country].cities.push(airport.city);
    }
    var countryNames = Object.keys(countryInfo);
    for(var i = 0; i<countryNames.length; ++i) {
        countries.push(countryNames[i]);
    }
    countries.sort();
};

function renderCountries(countries) {
    var dropDown = $('.countries');
    var defaultOption = $("<option selected disabled hidden value=''>Select country</option>");
    dropDown.append(defaultOption);
    for(var i = 0; i<countries.length; ++i) {
        var country = countries[i];
        var option = $("<option></option>");
        option.val(country);
        option.text(country);
        dropDown.append(option);    
    }
};

function showThingsToDo() {
    var selectedCountry = $('.countries').val();
    if(selectedCountry){
        console.log('Showing things to do for country: ' + selectedCountry);
    }
};

$(function(){
   populateCountries();
   renderCountries(countries);
   $('#showButton').click(showThingsToDo);
});





    