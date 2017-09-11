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
  
  //Displays the question and choices, and initiates the timer countdown to answer the question.
  
  populateTodayExercise();

  $("#exercises").on("click", function getExerciseInfo(event) {
    if (event.target.className === "btn btn-primary") {
      $("#exercise-progress").empty();
      var selectedExercise = event.target.id;
            
      if (Object.keys(phase1.day1[selectedExercise])[0] === "sets") {
        var numSets = phase1.day1[selectedExercise].sets;
        var numReps = phase1.day1[selectedExercise].reps;
        for (var i = 0; i < numSets; i++) {
          $("#exercise-progress").append("Set "+(i+1)+" ");      
          $("#exercise-progress").append("<input type='range' min='0' max='"+numReps+"' value='0' class='slider' id='"+(i+1)+"'>");
          $("#exercise-progress").append("Reps: <span id='rep-counter-"+(i+1)+"'></span><br>");
        };
      };
    };
  });
  
  $(document).on("input", ".slider", function(event) {
    var repCounterID = event.target.id;
    $("#rep-counter-"+repCounterID).html($(this).val());
  });

  // $("#myRange").on("input", function() {
  //   console.log("I'm working!");
  //   console.log($(this).val());
  //   $("#demo").html($(this).val());
  // });

  //My input needs to be user personal info: height, weight, 
  //Come up with workout plan per day, based on 
  //

  // $("#submit").on("click", function getExercise() {
  //   var newExercise = $("#search-input").val().trim();
  //   $.ajax({   
  //     url: queryURL,
  //     method: "GET",
  //   }).done(function(response) {
  //     console.log("I'm working!");
  //     console.log(response);
  //   })
  // });

  // var runExerciseTimer = function() {
  //   number = 30;
  //   intervalId = setInterval(decrement, 1000); 
  // };

  // var decrement = function() {
  //   console.log("I'm working!");
  //   number--;
  //   $("#exercise-timer").html(number);
  //   if (number === 0) {
  //     stop();
  //   };
  // };

  // var runMainTimer = function() {
  //   number = 0;
  //   intervalId = setInterval(increment, 1000);
  // };

  // var increment = function() {
  //   console.log("I'm working!");
  //   number++;
  //   $("#main-timer").html(number);
  //   if (number === 0) {
  //     stop();
  //   };
  // };

  // var stop = function() {     
  //   clearInterval(intervalId);
  // };


      // } else if (Object.keys(phase1.day1[selectedExercise])[0] === "timedSets") {
      //     var numSets = phase1.day1[selectedExercise].timedSets;
      //     var time = phase1.day1[selectedExercise].time;
      //     var unit = phase1.day1[selectedExercise].unit;
      //     for (var i = 0; i < numSets; i++) {
      //       $("#exercise-progress").append("<div>Set "+(i+1)+" </div>");      
      //       $("#exercise-progress").append("<div class='d-inline' id='exercise-timer'>");
      //     };
      //     stop();
      //     runExerciseTimer();
      // } else if (Object.keys(phase1.day1[selectedExercise])[0] === "cardio") {
      //     var cardioExercise = phase1.day1[selectedExercise].cardio;
      //     var time = phase1.day1[selectedExercise].time;
      //     var unit = phase1.day1[selectedExercise].unit;
      //     $("#exercise-progress").append(cardioExercise);      
      //     $("#exercise-progress").append("<div class='d-inline' id='exercise-timer'>");
      //     stop();
      //     runExerciseTimer();
      //   };
      // $("#instructions").html("Muscles worked: "+phase1.day1[selectedExercise].muscles);
});
