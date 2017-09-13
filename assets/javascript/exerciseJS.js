$(document).ready(function() {

  var populateTodayExercise = function() {
    for (var x in phase1.day1) {
        var exerciseDiv = $("<button>");
        exerciseDiv.attr("class", "btn btn-primary");
        exerciseDiv.attr("id", x);
        exerciseDiv.html(x); 
        $("#exercises").append(exerciseDiv);
    };
  };
    
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {
    if (event.target.className === "btn btn-primary") {
      $("#exercise-progress").empty();
      var selectedExercise = event.target.id;
            
      var numSets = phase1.day1[selectedExercise].sets;
      var numReps = phase1.day1[selectedExercise].reps;
      for (var i = 0; i < numSets; i++) {
        $("#exercise-progress").append("Set "+(i+1)+" ");
        $("#exercise-progress").append("Reps: <span id='rep-counter-"+(i+1)+"'></span><br>");
        $("#exercise-progress").append("<input type='range' min='0' max='"+numReps+"' value='0' class='slider' id='"+(i+1)+"'>");
        $("#exercise-progress").append("<label class='checkbox-inline'><input type='checkbox' value='' class='checkbox' id='checkbox-"+(i+1)+"'>Completed?</label><br><br>");     
      };
    };
  });
  
  //Create checkbox for whether or not set was completed. True or false?

  $(document).on("input", ".slider", function(event) {
    var repCounterID = event.target.id;
    $("#rep-counter-"+repCounterID).html($(this).val());
  });

  $(document).on("click", ".checkbox", function(event) {
    var checkboxID = event.target.id;
    console.log(checkboxID);
  });

});