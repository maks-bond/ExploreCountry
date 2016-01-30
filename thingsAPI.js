
function showThings (city) {
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/activities/search?location=" + city + "&startDate=2016-08-08&endDate=2016-08-18&apikey=lZg5sVj3LGQC7PZFGX6tkAw2mwAzyINJ",
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

function visualizationThings (city, things) {
   var title = $("<h3></h3>");
   title.text(city);
   $('.pic-container').append(title);
   for (var i = 0; i<things.length; i++) {
       var image = $('<img>',{id:'theImg', src:"http:" + things[i].image, height: 197, width: 350});
       $('.pic-container').append(image);
   }
}