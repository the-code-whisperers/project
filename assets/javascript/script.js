var nutAppID = 'c79bdc2c'
var nutAppKey = 'a2a34875f361b8c086046e87e26c7b52'
var search = ''


$('#button').on('click', function(event)
{
	search = $('#search').val().trim()

	$.ajax({
	url: "https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId="+nutAppID+"&appKey="+nutAppKey+"",
	method: "GET"
	}).done(function(response)
	{	
		console.log(response)
	});
})