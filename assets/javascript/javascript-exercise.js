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

  var colorRepProgress = function(id, width) {
    $("#"+id).css("background", "linear-gradient(to right, #4682B4 0%, #4682B4 "+ (width*10)+"%, #d3d3d3 "+(width*10)+"%, #d3d3d3 100%");
  };
    
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {
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