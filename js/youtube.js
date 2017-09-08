$(document).ready(function() {

  $('#search-term').submit(function(event) {

    event.preventDefault();
 
    var searchTerm = $('#query').val()
    console.log(searchTerm)
   
    getRequest(searchTerm);
  })


  var getRequest = function(searchTerm) {

    var searchParams = {
      
      part: 'snippet',

      key: 'AIzaSyD7beeskMiAH3aGuOyURD06SuubXkNHmx8',

      q: searchTerm
    }

    url='https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, searchParams, function(data) {

      var resultsArray = data.items;
      console.log(resultsArray);

      showResults(resultsArray);
    })
  }


  var showResults = function(results) {
    var html = ""

    $.each(results, function (key, item) {

        console.log(key);
        console.log(item);
        var imgs = item.snippet.thumbnails.high.url;
        var title = item.snippet.title;
        var videoId = item.id.videoId;
        var channelId = item.snippet.channelId;
        var channelName = item.snippet.channelTitle;
        var videoURL = "https://www.youtube.com/watch?v=" + videoId
        
        html = '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="' + imgs + '" title="' + title + '"class=img-responsive' + '"></a><span class="moreVidsFromCreator"><a href="https://www.youtube.com/channel/' + channelId + '" title="See more videos by ' + channelName + '">More by ' + channelName + '</a></span>';
        
        $('#search-results').append(html);

    })
  }

})
 
