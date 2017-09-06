// Initialize Firebase
var config = 
{
    apiKey: "AIzaSyAnaNI7XZ_HdTGF1IhWW51D2hrvSuyKIow",
    authDomain: "project-5f340.firebaseapp.com",
    databaseURL: "https://project-5f340.firebaseio.com",
    projectId: "project-5f340",
    storageBucket: "",
    messagingSenderId: "317564805030"
};

firebase.initializeApp(config);

var database = firebase.database()
var userID = sessionStorage.getItem("userID")
var userName = "";
var userCals = 0;
var calDiv = $('#cals')

database.ref("users/"+userID).once('value', function(snap)
{
	console.log(snap.val())
	userName = snap.val().name;
	userCals = snap.val().calories;
	$('#user-name').html(userName)
	calDiv.html(userCals)
})

database.ref("users/"+userID).on('value', function(snap)
{
	var currentCals = snap.val().calories
	calDiv.html(currentCals)
	var progressPercent = currentCals/calMax*100
	progressBar.css('width', progressPercent+'%')
})

var nutAppID = 'c79bdc2c';
var nutAppKey = 'a2a34875f361b8c086046e87e26c7b52';
var search = '';

//"https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=*&appId="+nutAppID+"&appKey="+nutAppKey+"",
//test id: "51d37a92cc9bff5553aa9f36"
var totalCals = 0;
var calGoal = 2000;
var calMax = 3000;
var progressBar = $('.progress-bar')
var foodsSearchResults = $('#foods-search-result')

console.log(userID)

var getFoodSearchResults = function()
{
	foodsSearchResults.empty()
	search = $('#search').val().trim()

	$.ajax({
		url: "https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=*&appId="+nutAppID+"&appKey="+nutAppKey+"",
		method: "GET"
	}).done(function(response)
	{	
		console.log(response.hits)

		for (var i=0; i<response.hits.length; i++)
		{
			var name = response.hits[i].fields.item_name;
			var id = response.hits[i]._id
			var brandName =  response.hits[i].fields.brand_name;
			var cals = Math.round(response.hits[i].fields.nf_calories);
			var newButton = $("<button class='food-picked'>"+name+": "+brandName+", ("+cals+")</button>");
			newButton.attr('id', id)
			foodsSearchResults.append(newButton)
		}
	});
}

var getExerciseSearchResults = function()
{
	//foodsSearchResults.empty()
	search = $('#exercise-search').val().trim()

	$.ajax({
		url: "https://api.nutritionix.com/v2/natural/exercise/search/"+search+"?results=0:20&fields=*&appId="+nutAppID+"&appKey="+nutAppKey+"",
		method: "GET"
	}).done(function(response)
	{	
		console.log(response)

		for (var i=0; i<response.hits.length; i++)
		{
			var name = response.hits[i].fields.item_name;
			var id = response.hits[i]._id
			var brandName =  response.hits[i].fields.brand_name;
			var cals = Math.round(response.hits[i].fields.nf_calories);
			var newButton = $("<button class='food-picked'>"+name+": "+brandName+", ("+cals+")</button>");
			newButton.attr('id', id)
			foodsSearchResults.append(newButton)
		}
	});
}

$('#button').on('click', function(event)
{
	getFoodSearchResults()
});

$('#search').on('keypress', function(event)
{
	if (event.which===13)
	{
		getFoodSearchResults()
	}
})

$(document).on('click', '.food-picked', function(event)
{
	var foodPicked = $(this)
	var pickedID = foodPicked.attr('id')
	
	$.ajax({
		url: "https://api.nutritionix.com/v1_1/item?id="+pickedID+"&appId="+nutAppID+"&appKey="+nutAppKey+"",
		method: "GET"
	}).done(function(response)
	{
		database.ref("users/"+userID).once('value', function(snap)
		{
			var name = response.item_name
			var cals = Math.round(response.nf_calories)
			var calsBefore = 0;
			totalCals = totalCals + cals
			var addedFood = $("<h4 class='added-food'>"+name+": "+cals+"</h4>")
			$('#foods-added').append(addedFood)
			console.log("snap cals"+snap.val().calories)
			calsBefore = snap.val().calories;
			var newCals = calsBefore + cals;

			database.ref("users/"+userID).update(
			{
				calories: newCals
			})

		})
	});
});
