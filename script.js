/* global $ */

$(function(){
   populateCountries();
   renderCountries(countries);
   $('#showButton').click(showThingsToDo);
  // $("#gallery").unitegallery();
  /*   gallery_theme:"tilesgrid",
    grid_space_between_cols:0,
    grid_space_between_rows:0,
    tile_enable_border:false,
    tile_enable_shadow:false,
    grid_padding:0,
    tile_width:250,
   }); */
}); 


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
        
        countryInfo[country].cities.push($.extend({}, airport));
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
        $('.pic-container')[0].innerHTML = "";
        //console.log('Showing things to do for country: ' + selectedCountry);
        var cities = countryInfo[selectedCountry].cities;
        for(var i = 0; i<cities.length; ++i){
            var city = cities[i];
            showThings(city);
        }
    }
};




