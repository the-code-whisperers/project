$(document).ready(function() {

  var workoutLog = {
    exercise: "",
    setsAndReps: {}
  };

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


  var colorRepProgress = function(id, width) {
    $("#"+id).css("background", "linear-gradient(to right, #4682B4 0%, #4682B4 "+ (width*10)+"%, #d3d3d3 "+(width*10)+"%, #d3d3d3 100%");
  };
    
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {
    
    currentWorkout = event.target.id

    $('#search-results').empty();

    searchTerm = currentWorkout;

    getRequest(searchTerm);


    if (event.target.className === "btn btn-primary") {
      $("#exercise-progress").empty();
      workoutLog.exercise = "";
      workoutLog.setsAndReps = {};      
      var selectedExercise = event.target.id;
      var numSets = phase1.day1[selectedExercise].sets;
      var numReps = phase1.day1[selectedExercise].reps;
      for (var i = 0; i < numSets; i++) {
        $("#exercise-progress").append(
          "<p><span class='label label-primary label-text'>Set "+(i+1)+"</span>"+
          "<span class='label label-info label-text'>Reps: <span id='rep-counter-"+(i+1)+"'>0</span></span>"+
          "<span class='label label-warning label-text pull-right'><label class='checkbox-inline'><input type='checkbox' class='checkbox !checked' id='checkbox-"+(i+1)+"'><b>Completed set?</label></span></p>"+
          "<p><input type='range' min='0' max='"+numReps+"' value='0' class='slider' id='"+(i+1)+"'></p><br>"
        );     
      };
      $("#exercise-progress").append("<button id='done' class='btn btn-primary'>Done with "+selectedExercise+"</button>");
      workoutLog.exercise = selectedExercise;
      $("#muscles-worked").html("<u><b>Muscles worked out</b></u><br>"+phase1.day1[selectedExercise].muscles);

    };
  });

  $(document).on("input", ".slider", function(event) {
    var repCounterID = event.target.id;
    $("#rep-counter-"+repCounterID).html($(this).val());
    colorRepProgress(repCounterID, $(this).val());
  });

  $(document).on("click", ".checkbox", function(event) {
    var checkboxID = event.target.id;
    var setNumber = checkboxID.split("-")[1];
    if ($("#"+checkboxID).attr("class") === "checkbox !checked") {
      $("#"+checkboxID).attr("class", "checkbox checked");
      $("#"+setNumber).attr("class", "slider-done");
      document.getElementById(setNumber).disabled = true;
      var repsCompleted = $("#rep-counter-"+setNumber).html();
      workoutLog.setsAndReps["Set "+setNumber] = repsCompleted;
    } else if ($("#"+checkboxID).attr("class") === "checkbox checked") {
        $("#"+checkboxID).attr("class", "checkbox !checked");
        $("#"+setNumber).attr("class", "slider");
        document.getElementById(setNumber).disabled = false;
        delete workoutLog.setsAndReps["Set "+setNumber];
    };
  });

  $(document).on("click", "#done", function(event) {
    console.log(workoutLog);
    //Export to firebase.
  });

});