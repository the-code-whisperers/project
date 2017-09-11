$(document).ready(function() {

  var currentWorkout = "";
  var currentCaloriesPerRep = 0;
  var currentSet = "";

  var populateTodayExercise = function() {
    for (var x in phase1.day1) {
        var exerciseDiv = $("<button>");
        exerciseDiv.attr("class", "btn btn-primary");
        exerciseDiv.attr("id", x);
        exerciseDiv.html(x); 
        $("#exercises").append(exerciseDiv);
    };
  };

  var getRequest = function(searchTerm) {

    var searchParams = {
      
      part: 'snippet',

      key: 'AIzaSyD7beeskMiAH3aGuOyURD06SuubXkNHmx8',

      maxResults: 10,

      q: searchTerm,


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
        
        html = '<div>' + '<div>' + title + '</div>' + '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="' + imgs + '" title="' + title + '"class= img-responsive' + '></a><div class="moreVidsFromCreator"><a href="https://www.youtube.com/channel/' + channelId + '" title="See more videos by ' + channelName + '">More videos by ' + channelName + '</a></div>' + '</div>';
        
        $('#search-results').append(html);

    })
  }
    
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {

    currentWorkout = event.target.id

    $('#search-results').empty();

    searchTerm = currentWorkout;

    getRequest(searchTerm);

    if (event.target.className === "btn btn-primary") {
      $("#exercise-progress").empty();
      var selectedExercise = event.target.id;
            
      var numSets = phase1.day1[selectedExercise].sets;
      var numReps = phase1.day1[selectedExercise].reps;

      for (var i = 0; i < numSets; i++) {
        $("#exercise-progress").append("Set "+(i+1)+" ");
        $("#exercise-progress").append("Reps: <span id='rep-counter-"+(i+1)+"'>");
        $("#exercise-progress").append("<input type='range' min='0' max='"+numReps+"' value='0' class='slider' id='"+(i+1)+"'>");
        $("#exercise-progress").append("<label class='checkbox-inline'><input type='checkbox' value='' class='checkbox' id='checkbox-"+(i+1)+"'>Completed?</label><br><br>");     
      };
    };
  });
  
  //Create checkbox for whether or not set was completed. True or false?

  $(document).on("input", ".slider", function(event) {
    var repCounterID = event.target.id;
    $("#rep-counter-"+repCounterID).html($(this).val());
    $("#rep-counter-"+repCounterID).data("reps", $(this).val())
  });

  $(document).on("click", ".checkbox", function(event) {
    var checkboxID = event.target.id;
    var splitCheckBoxID = checkboxID.split('')
    var repID = splitCheckBoxID[splitCheckBoxID.length - 1]
    currentSet = repID;
    currentCaloriesPerRep = phase1.day1[currentWorkout].calories;
    var amountOfReps = $("#rep-counter-"+repID).data("reps")
    console.log("workout: "+currentWorkout+", set: "+currentSet+", reps: "+amountOfReps+" Cals per Rep: "+currentCaloriesPerRep)

    var newCalories = 0;

    database.ref("users").once('value', function(snap)
    {
      console.log(snap.val()[userID])
      console.log(snap.val()[userID].calories)
      console.log(currentCaloriesPerRep*amountOfReps)
      newCalories = snap.val()[userID].calories - currentCaloriesPerRep*amountOfReps

      var tempCalArray = snap.val()[userID].calsOverTime;
      tempCalArray.push(newCalories)

      database.ref("users/"+userID).update(
      {
        calories: newCalories,
        calsOverTime: tempCalArray
      })
    })


  });

});