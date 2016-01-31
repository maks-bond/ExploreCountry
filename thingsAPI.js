// TODO: Take it from your location
var fromAirport = {code: 'SEA'};

// TODO: Add people count
function buildFlightSearchURL(from, to, departure, arrival) {
    return "https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:"+from+",to:"+to+",departure:"+departure+"TANYT&leg2=from:"+to+",to:"+from+",departure:"+arrival+"TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&mode=search";
};

function buildHotelSearchURL(toCity, toCountry, departure, arrival) {
    return "https://www.expedia.com/Hotel-Search?#&destination="+toCity+", "+toCountry+"&startDate="+departure+"&endDate="+arrival+"&adults=1";
};

function buildCarSearchURL(toCity, toCountry, departure, arrival){
    return "https://www.expedia.com/carsearch?date1="+departure+"&date2="+arrival+"&kind=1&locn="+toCity+", "+toCountry+"&rdus=10&vend=";
};

function buildThingsToDoURL(toCity, toCountry, departure, arrival) {
    return "https://www.expedia.com/things-to-do/?location="+toCity+", "+toCountry+"&startDate="+departure+"&endDate="+arrival;
}

function showThings (city) {
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/activities/search?location=" + city.city + "&startDate=2016-08-08&endDate=2016-08-18&apikey=lZg5sVj3LGQC7PZFGX6tkAw2mwAzyINJ",
    type: "get",
    success: function(res) { 
      var things = [];
      var results = res.activities;
      for (var i = 0; i<results.length; i++) {
        var thingsObject = {};
        thingsObject.title = results[i].title;
        thingsObject.image = results[i].imageUrl;
        things.push(thingsObject);
      }
      visualizationThings (city, things);
    }
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createButtons(fromCity, toCity, departure, arrival) {
   var buttonGroup = $("<div class='cityButtonGroup'></div>");
   var flightDiv = $("<div class='cityButtonContainer'></div>");
   var hotelDiv = flightDiv.clone();
   var carDiv = flightDiv.clone();
   
   var flightPrice = getRandomInt(800, 1000);
   var hotelPrice = getRandomInt(40, 70);
   var carPrice = getRandomInt(15, 25);
   
   var flightExpediaButton = $("<button class='cityButton medium alert button'>Flight from "+ flightPrice +"$ </button>");
   var hotelExpediaButton = $("<button class='cityButton medium alert button'>Hotel from "+hotelPrice+"$</button>");
   var carExpediaButton = $("<button class='cityButton medium alert button'>Car from "+carPrice+"$ per day</button>");
//    var flightPrice = $('<span>from 1000$</span>');
//    var hotelPrice = $('<span>from 50$</span>');
//    var carPrice = $('<span>from 25$</span>');
   
   var fromCityCode = fromCity.code;
   var toCityCode = toCity.code;

//    showTravelData(fromCityCode, toCityCode, departure, arrival, function(prices) {
//       console.log(prices);
//    });
   
   flightExpediaButton.click(function(){
       window.open(buildFlightSearchURL(fromCityCode, toCityCode, departure, arrival), '_blank');
   });
   var toCityName = toCity.city;
   var toCountry = toCity.country;
   hotelExpediaButton.click(function(){
       window.open(buildHotelSearchURL(toCityName, toCountry, departure, arrival), '_blank');
   });
   carExpediaButton.click(function(){
       window.open(buildCarSearchURL(toCityName, toCountry, departure, arrival), '_blank');
   });
   flightDiv.append(flightExpediaButton)//.append(flightPrice);
   hotelDiv.append(hotelExpediaButton)//.append(hotelPrice);
   carDiv.append(carExpediaButton)//    .append(carPrice);
   buttonGroup.append(flightDiv).append(hotelDiv).append(carDiv);
  
   return buttonGroup;
};

function visualizationThings (city, things, departure, arrival) {
   var galleryId = 'gallery' + city.city;
   galleryId = galleryId.replace(/ /g,"");
   var $cityContainer = $("<div class='cityContainer'></div>");
   var $galleryContainer = $("<div id='" + galleryId + "' class='galleryDiv'></div>") //.addClass('none');
   var title = $('<div class="cityTitle"></div>');
    
   var titleText = $("<h3 class='titleText'></h3>");
   titleText.text(city.city);
   var buttonGroup = createButtons(fromAirport, city, "02/08/2016", "02/14/2016");
   title.append(titleText);
   title.append(buttonGroup);
   
   $cityContainer.append(title).append($galleryContainer);
   
   for (var i = 0; i<things.length; i++) {
       var imageSource = "http:" + things[i].image;
       var image = $('<img>',{src:imageSource, "data-image": imageSource, "data-description": "desc", alt: things[i].title});
       var a = $("<a href='"+buildThingsToDoURL(city.city, city.country, "02/08/2016", "02/14/2016")+"'></a>");
       a.append(image);
       $galleryContainer.append(a);
   }
   $('.pic-container').append($cityContainer);
   $galleryContainer.unitegallery({
      gallery_theme:"tilesgrid",
      tile_as_link:true,
      tile_enable_textpanel:true,
      tile_enable_icons:false,
      tile_textpanel_title_text_align: "center",
      grid_space_between_cols:0,
      grid_space_between_rows:0,
      tile_enable_border:false,
      tile_enable_shadow:false,
      grid_padding:0,
      tile_width:300
   }); 
}

function showTravelData (fromCityCode, toCityCode, departure, arrival, callback) {
  var travelData = {};
  var departureDate = (new Date(departure)).toISOString();
  var arrivalDate = (new Date(arrival)).toISOString();
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/mflights/search?departureDate="+departureDate+"&returnDate="+arrivalDate+"&departureAirport="+ fromCityCode + "&arrivalAirport=" + toCityCode + "&apikey=TkefBxxLZbMGgOvKRGFLIkYJxcB3bYtA",
    type: "get",
    success: function(res) { 
      var results = res.offers;
      var price = results[0].baseFarePrice.formattedWholePrice;
      travelData.flightPrice = price;
      callback(travelData);
      //console.log(travelData.flightPrice)
    }
  });
  
  /*$.ajax({
    url: "http://terminal2.expedia.com/x/cars/search?pickupdate=2016-03-21T10:00&dropoffdate=2016-03-28T16:30&pickuplocation=" +airport.arrival.code + "&dropofflocation=" + airport + "&sort=price&limit=2&apikey=PxOSAzW4pRSLSJSVYnuQQoAQNPGGBWOV",
    type: "get",
    success: function(res) { 
      var results = res.CarInfoList.CarInfo;
      var priceCar = results[0].Price.TotalRate.Value;
      travelData.carPrice = '$' + Math.round(priceCar);
      //console.log(travelData.carPrice)
    }
  });
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/hotels?maxhotels=3&location=47.6063889%2C-122.3308333&radius=5km&checkInDate=2016-02-10&checkOutDate=2016-02-11&adults=2&sort=price&apikey=0Eb5uaO0qiviAKfn4E6pbzGrdSaYA7Or",
    type: "get",
    success: function(res) { 
      var results = res.HotelInfoList.HotelInfo;
      var priceHotel = results[0].Price.TotalRate.Value;
      travelData.hotelPrice = '$' + Math.round(priceHotel);
      //console.log(travelData.hotelPrice)
    }
  });*/
}