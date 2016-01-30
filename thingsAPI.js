
function showThings () {
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/activities/search?location=London&startDate=2016-08-08&endDate=2016-08-18&apikey=lZg5sVj3LGQC7PZFGX6tkAw2mwAzyINJ",
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
      visualizationThings (things);
    }
  });
}

function visualizationThings (things) {
   
   for (var i = 0; i<things.length; i++) {
    
    
     $('.pic-container').append($('<img>',{id:'theImg', src:"http:" + things[i].image, height: 197, width: 350}))

   }
}