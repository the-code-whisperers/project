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

var calsOverTime = [0]
var database = firebase.database()
var token = sessionStorage.getItem("userID")
var userID  = -1;
var userName = "";
var userCals = 0;
var calDiv = $('#cals')
var progressBar = $('.progress-bar')
var posProgress = $('#pos-progress')
var negProgress = $('#neg-progress')

console.log(token)

if (token === null)
{
	var login = $("<a href = 'login.html'></a>")
	$('#user-name').html("Login Here")
	$("#new-day").html("Login")

	$("#new-day").on("click", function()
	{
		window.location.href = 'login.html';
	})
	//login.append($("#user-name"))
}

else
{
	database.ref("users").once("value", function(snap)
	{
		console.log(snap.val()[0].token)

		for (var i=0; i<snap.val().length; i++)
		{
			if (snap.val()[i].token === token)
			{
				userID = i;
				userName = snap.val()[i].name;
				userCals = snap.val()[i].calories;
				$('#user-name').html(userName)
				calDiv.html(userCals)
				var progressPercent = userCals/calMax*100
				progressBar.css('width', progressPercent+'%')
				
				if (progressPercent >= 0)
				{
					posProgress.show()
					negProgress.hide()
					posProgress.animate({'width': progressPercent+'%'})
				}

				else
				{
					negProgress.show()
					posProgress.hide()
					progressPercent = -1*progressPercent
					negProgress.animate({'width': progressPercent+'%'})
				}
			}
		}
	})

	/*database.ref("users/"+userID).once('value', function(snap)
	{
		console.log(snap.val())
		userName = snap.val().name;
		userCals = snap.val().calories;
		$('#user-name').html(userName)
		calDiv.html(userCals)
	})*/

	database.ref("users").on('value', function(snap)
	{
		if (userID !== -1)
		{
			var currentCals = snap.val()[userID].calories
			calDiv.html(currentCals)
			var progressPercent = currentCals/calMax*100
			progressBar.css('width', progressPercent+'%')

			if (progressPercent >= 0)
			{
				posProgress.show()
				negProgress.hide()
				posProgress.animate({'width': progressPercent+'%'})
			}

			else
			{
				negProgress.show()
				posProgress.hide()
				progressPercent = -1*progressPercent
				negProgress.animate({'width': progressPercent+'%'})
			}

			calsOverTime.push(currentCals)
		}
	})

	var nutAppID = 'c79bdc2c';
	var nutAppKey = 'a2a34875f361b8c086046e87e26c7b52';
	var search = '';

	//"https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=*&appId="+nutAppID+"&appKey="+nutAppKey+"",
	//test id: "51d37a92cc9bff5553aa9f36"
	var calMax = 3000;
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
				var newButton = $("<button class='btn btn-default food-picked'>"+name+": "+brandName+", ("+cals+")</button><br>");
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

	$('#new-day').on('click', function(event)
	{
		var calarray = [0]

		database.ref("users/"+userID).update(
		{
			calories: 0,
			calsOverTime: calarray
		})
	})

	/*$('#chartModal').modal("show").on('shown', function(event)
	{ 
	    console.log(event)
	});*/

	$('.cals-over-time').on('click', function(event)
	{

		$('#chartModal').modal("show").on('shown.bs.modal', function(event)
		{

			database.ref('users/'+userID).once('value', function(snap)
			{
				var calsArray = snap.val().calsOverTime

				var chart = c3.generate(
				{
					bindto: '#chart',
					data: 
					{
					    columns: [
					    calsArray,
					  ]
					}
				});


		/*		chart.load({
			    columns: 
				    [
				        calsArray,
				    ]
				});*/
			})

		})
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
				var addedFood = $("<h4 class='added-food'>"+name+": "+cals+"</h4>")
				$('#foods-added').append(addedFood)
				console.log("snap cals"+snap.val().calories)
				calsBefore = snap.val().calories;
				var newCals = calsBefore + cals;

				var tempCalsOverTime = snap.val().calsOverTime;
				tempCalsOverTime.push(newCals)

				database.ref("users/"+userID).update(
				{
					calories: newCals,
					calsOverTime: tempCalsOverTime
				})
			})
		});
	});
}
