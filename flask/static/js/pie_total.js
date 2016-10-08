var dps = [
		{name: "Trump", y: 0}	,
		{name: "Clinton", y: 0}
		];

var chart3 = new CanvasJS.Chart("pieChart",
	{
		title:{
			text: "Trmp v. Clinton Total Tweets",
			fontFamily: "arial black"
		},
                animationEnabled: false,
		legend: {
			verticalAlign: "bottom",
			horizontalAlign: "center"
		},
		theme: "theme1",
		data: [
		{        
			type: "pie",
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 20,
			indexLabelFontWeight: "bold",
			startAngle:0,
			indexLabelFontColor: "MistyRose",       
			indexLabelLineColor: "darkgrey", 
			indexLabelPlacement: "inside", 
			toolTipContent: "{name}: {y} Tweets",
			showInLegend: true,
			indexLabel: "#percent%", 
			dataPoints: dps
		}
		]
	});
	
	var updateInterval = 100;  // milliseconds

		var updateChart3 = function () {
	        $.get("/posneg", function(data, status){
				dps[0].y = data.trump.pos + data.trump.neg;
				dps[1].y = data.clinton.pos + data.clinton.neg;
				console.log("Pie");
			});
			chart3.render();

		};
		    updateChart3();
			// update chart after specified interval
			setInterval(function(){updateChart3()}, updateInterval);
