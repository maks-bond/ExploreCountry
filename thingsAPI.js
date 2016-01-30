function showThings () {
  $.ajax({
    url: "http://terminal2.expedia.com:80/x/activities/search?location=London&startDate=2016-08-08&endDate=2016-08-18&apikey=lZg5sVj3LGQC7PZFGX6tkAw2mwAzyINJ",
    type: "get",
    success: function(res) { 

      var things = [];
      var obj = res;
      var results = obj.activities;
      for (var i = 0; i<results.length; i++) {
        things.push(results[i].imageUrl);
      }
      console.log(things);
    }
  });
}