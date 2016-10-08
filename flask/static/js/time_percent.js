	var updateInterval = 100;
	var xVal = 0;
	var dataLength = 1000;


		var clintonDPS = []; // dataPoints
		var trumpDPS = [];

		var chart = new CanvasJS.Chart("chartContainer",{
			title :{
				text: "Trump vs Clinton positive tweets"
			},
			zoomEnabled: true,
			data: [{
				type: "line",
				dataPoints: trumpDPS,
				showInLegend: true,
				name: "Trump"
			},
			{
				type: "line",
				dataPoints: clintonDPS,
				showInLegend: true,
				name: "Clinton"
			}]
		}); 
		
		var updateChart = function (count) {
			count = count || 1;
			$.get("/percents", function(data, status){
				 clintonDPS.push({x: xVal, y: data.clinton});
    			 trumpDPS.push({x: xVal, y: data.trump});
    		});
			xVal++;
			if (clintonDPS.length > dataLength)
			{
				clintonDPS.shift();				
			}
			if (trumpDPS.length > dataLength){
				trumpDPS.shift();
			}
			chart.render();		

		};

		// generates first set of dataPoints
		updateChart(dataLength); 

		// update chart after specified time. 
		setInterval(function(){updateChart()}, updateInterval); 
