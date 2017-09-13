$(document).ready(function() {

  //Helper functions and variables.

  var workoutLog = {
    exercise: "",
    setsAndReps: []
  };

  var repsArray = [];
  var currentSet = 0;
  var selectedExercise = "";
  var numSets = 0;
  var numReps = 0;

  var showTodaysExerciseOptions = function() {

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
    };

    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url, searchParams, function(data) {

      var resultsArray = data.items;
      console.log(resultsArray);
      showResults(resultsArray);
    });
  };

  var showResults = function(results) {
    var html = "";

    $.each(results, function (key, item) {

        console.log(key);
        console.log(item);
        var imgs = item.snippet.thumbnails.high.url;
        var title = item.snippet.title;
        var videoId = item.id.videoId;
        var channelId = item.snippet.channelId;
        var channelName = item.snippet.channelTitle;
        var videoURL = "https://www.youtube.com/watch?v=" + videoId;
        
        html = '<div>' + '<div>' + title + '</div>' + '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="' + imgs + '" title="' + title + '"class= img-responsive' + '></a><div class="moreVidsFromCreator"><a href="https://www.youtube.com/channel/' + channelId + '" title="See more videos by ' + channelName + '">More videos by ' + channelName + '</a></div>' + '</div>';
        
        $('#search-results').append(html);
    });
  };

  var addSetAndRep = function(setInProgress, totalReps, totalSets) {

    if (setInProgress < totalSets) {
        var setNumberContainer = $("<span>");
        setNumberContainer.attr("class", "label label-primary label-text");
        setNumberContainer.text("Set "+(setInProgress+1));

        var repNumberContainer = $("<span>");
        repNumberContainer.attr("class", "label label-info label-text");
        repNumberContainer.html("Reps: "+"<span id='rep-counter-"+(setInProgress+1)+"'>0</span>");

        var setCheckBoxContainer = $("<span>");
        var setCheckBoxLabel = $("<label>");
        var setCheckBox = $("<input>");
        setCheckBoxContainer.attr("class", "label label-warning label-text pull-right");   
        setCheckBoxLabel.attr("class", "checkbox-inline");
        setCheckBox.attr({type: "checkbox", class: "checkbox !checked checkbox-pointer", id: "checkbox-"+(setInProgress+1)});
        setCheckBoxLabel.append(setCheckBox);
        setCheckBoxLabel.append("<b>Completed set?</b>");
        setCheckBoxContainer.append(setCheckBoxLabel);

        var repSliderBar = $("<input>");
        repSliderBar.attr({type: "range", min: "0", max: totalReps, value: 0, class: "slider", id: (setInProgress+1)});

        $("#exercise-progress").append(setNumberContainer, repNumberContainer, setCheckBoxContainer, "<p>", repSliderBar, "</p>", "<br>");
      };
  };

  var fillRepProgress = function(id, width) {

    $("#"+id).css("background", "linear-gradient(to right, #4682B4 0%, #4682B4 "+(width*10)+"%, #d3d3d3 "+(width*10)+"%, #d3d3d3 100%");
  };

  //App begins here!
    
  showTodaysExerciseOptions();

  $("#exercises").on("click", function getExerciseInfo(event) {

    currentSet = 0;
    $("#done-button-container").empty();  

    if (event.target.className === "btn btn-primary") {
      $("#exercise-progress").empty();
      $('#search-results').empty();
      $("#exercise-instructions").show();
      repsArray = []
      // currentWorkout = event.target.id;
      selectedExercise = event.target.id;
      // searchTerm = currentWorkout;
      searchTerm = selectedExercise;

      getRequest(searchTerm);
      workoutLog.exercise = "";
      workoutLog.setsAndReps = {};      
      // selectedExercise = event.target.id;
      numSets = phase1.day1[selectedExercise].sets;
      numReps = phase1.day1[selectedExercise].reps;

      addSetAndRep(currentSet, numReps, numSets);
           
      $("#done-button-container").append("<button id='done' class='btn btn-primary'>Done with "+selectedExercise+"</button>");
      workoutLog.exercise = selectedExercise;
    };
  });

  $(document).on("input", ".slider", function adjustSlider(event) {

    var repCounterID = event.target.id;
    $("#rep-counter-"+repCounterID).html($(this).val());
    fillRepProgress(repCounterID, $(this).val());
  });

  $(document).on("click", ".checkbox", function finishSet(event) {

    var checkboxID = event.target.id;
    var setNumber = checkboxID.split("-")[1];
    $("#"+checkboxID).attr("class", "checkbox checked checkbox-pointer");
    $("#"+setNumber).attr("class", "slider-done");
    document.getElementById(setNumber).disabled = true;
    document.getElementById(checkboxID).disabled = true;
    var repsCompleted = $("#rep-counter-"+setNumber).html();
    var intRepsCompleted = parseInt(repsCompleted)
    repsArray.push(intRepsCompleted)
    workoutLog.setsAndReps[setNumber-1] = repsCompleted;
    currentSet++;
    addSetAndRep(currentSet, numReps, numSets);
  });

  $(document).on("click", "#done", function finishExercise(event) {

    // console.log(workoutLog.setsAndReps[0]);
    // console.log(workoutLog.setsAndReps);
    console.log(repsArray);
    console.log(phase1.day1[selectedExercise].calories);
    var totalReps = 0;
    document.getElementById("done").disabled = true;

    for (var i = 0; i < repsArray.length; i++)
    {
      totalReps = totalReps + repsArray[i];
    };

    var oldCals = 0;

    database.ref("users/"+userID).once("value", function(snap)
    {
      oldCals = snap.val().calories;
      var oldCalArray = snap.val().calsOverTime;
      console.log("old cals "+oldCals);
      console.log("old cals Array "+oldCalArray);

      var newCals = oldCals - totalReps*phase1.day1[selectedExercise].calories;
      oldCalArray.push(newCals);

      database.ref("users/"+userID).update(
      {
        calories: newCals,
        calsOverTime: oldCalArray
      })
    });
    
    for (var i = 0; i < (currentSet+1); i++) {
      console.log("currentSet: "+(currentSet+1),"checkbox-"+(currentSet+1));
      document.getElementById("checkbox-"+(currentSet+1)).disabled = true;
      $("#"+(currentSet+1)).attr("class", "slider-done");
    };

    repsArray = [];
  });

});