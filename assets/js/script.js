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

$('#button').on('click', function(event)
{
	search = $('#search').val().trim();

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
			var newButton = $("<button class='btn btn-default food-picked'>"+name+": "+brandName+", ("+cals+")</button>");
			newButton.attr('id', id)
			foodsSearchResults.append(newButton)
		}
	});
});

$(document).on('click', '.food-picked', function(event)
{
	var foodPicked = $(this)
	var pickedID = foodPicked.attr('id')
	
	$.ajax({
		url: "https://api.nutritionix.com/v1_1/item?id="+pickedID+"&appId="+nutAppID+"&appKey="+nutAppKey+"",
		method: "GET"
	}).done(function(response)
	{
		var name = response.item_name
		var cals = Math.round(response.nf_calories)
		totalCals = totalCals + cals
		var progressPercent = totalCals/calMax*100
		var addedFood = $("<h4 class='added-food'>"+name+": "+cals+"</h4>")
		$('#foods-added').append(addedFood)
		$('#cals').html(totalCals)
		progressBar.css('width', progressPercent+'%')
	});
});
