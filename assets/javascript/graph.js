

var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        calsOverTime,
      ]
    }
});

$("button").on('click', function(event)
{
	var r = Math.floor(Math.random()*80)

	numbers.push(r)

	console.log(r)

	chart.load({
	    columns: 
	    [
	        numbers,
	    ]
	});
})