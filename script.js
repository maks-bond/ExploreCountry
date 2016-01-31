/* global google */
/* global $ */

$(function(){
   populateCountries();
   renderCountries(countries);
   //$( "#firstCountries" ).combobox();
//    $( "#firstCountries" ).autocomplete({
//       source: countries
//     });
   $('#showButton').click(showThingsToDo);


   $('#firstCountries').on('change', countrySelectionChanged);
   $('#exploreButton').on('click', function(){
       isMapMode = false;
       modeChanged();
       showThingsToDo($('#firstCountries').val());
   });
   $('#backToMap').click(function(){
       isMapMode = true;
       modeChanged();
   });
   $('#datepickerDepart').datepicker();
   $('#datepickerDepart').datepicker('setDate', new Date("02/08/2016"));
   $('#datepickerReturn').datepicker();
   $('#datepickerReturn').datepicker('setDate', new Date("02/14/2016"));
   modeChanged();

}); 

var isMapMode = true;
var airports = airportData.airports;
var countries = [];
var countryInfo = {};
var map;
var geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3
    });
    map.addListener('click', function(e) {	 
        var latLng = e.latLng;
        positionCountryByLatLng(latLng);
    });
    map.addListener('idle', function(e){
        $('.gmnoprint').remove();
    });
};

function countrySelectionChanged(event) {
    var country = $('#firstCountries').val();
    positionCountry(country);
    var exploreText = $('#exploreButton').text();
    $('#exploreButton').text("Explore " + country);
};

function positionCountry(country) {
    if(!geocoder) {
        geocoder = new google.maps.Geocoder();    
    }
    geocoder.geocode( { 'address': country}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.fitBounds(results[0].geometry.viewport);
        }
    });
};

function positionCountryByLatLng(latLng) {
    if(!geocoder) {
        geocoder = new google.maps.Geocoder();    
    }
    geocoder.geocode({'location': latLng}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK && results.length) {
            var last_result = results[results.length - 1];
            var country = last_result.formatted_address;
            $('#firstCountries').val(country);
            countrySelectionChanged();
        }
    })
};

function modeChanged() {
    if(isMapMode) {
        $('#first').show();
        $('#details').hide();
    } else {
        $('#first').hide();
        $('#details').show();
    }
};
  
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

function showThingsToDo(selectedCountry) {
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




