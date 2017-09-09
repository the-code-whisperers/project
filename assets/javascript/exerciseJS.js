$(document).ready(function() {

  var populateTodayExercise = function() {
    for (i = 0; i < phaseOne.dayOne.length; i++) {
      var exerciseDiv = $("<button>");
      exerciseDiv.attr("class", "btn btn-primary");
      exerciseDiv.attr("id", phaseOne.dayOne[i][0]);
      exerciseDiv.html(phaseOne.dayOne[i][0]); 
      $("#exercises").append(exerciseDiv);
    };
  };

  $("#exercises").on("click", function getExerciseInfo(event) {
    if (event.target.className=="btn btn-primary") {
      var selectedExercise = event.target.id;
            
    };
  });

  populateTodayExercise();

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
});
