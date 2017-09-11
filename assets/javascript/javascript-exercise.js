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
    
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {

    currentWorkout = event.target.id

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