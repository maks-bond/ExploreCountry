
$(function(){
  populateCountries();
  showThings();
})

var airports = airportData.airports;
var countries = {};
function populateCountries(){
    for (var i = 0; i<airports.length; ++i) {
        var airport = airports[i];
        var country = airport.country;
        countries[country] = true;
    }
}



