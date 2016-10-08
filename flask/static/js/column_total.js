		var updateInterval2 = 100;
		var xVal = 0;
		var dataLength = 1000; // number of dataPoints visible at any point
		
		var chart2 = new CanvasJS.Chart("chart2",{
			title :{
				text: "All Time Tweets"
			},			
			data: [{
				type: "stackedColumn",
				dataPoints: [ 
					{ y: 0, label: 'Clinton'},
					{ y: 0, label: 'Trump'},
				],
				showInLegend: true,
				name: "Positive"
			},
			{
				type: "stackedColumn",
				dataPoints: [ 
					{ y: 0, label: 'Clinton'},
					{ y: 0, label: 'Trump'},
				],
				showInLegend: true,
				name: "Negative"
			}]
		});
		
		
		var updateChart2 = function(){
			$.get("/posneg", function(data, status){
				chart2.options.data[0].dataPoints[0].y = data.clinton.pos;
				chart2.options.data[0].dataPoints[1].y = data.trump.pos;
				chart2.options.data[1].dataPoints[0].y = data.clinton.neg;
				chart2.options.data[1].dataPoints[1].y = data.trump.neg;
			});
			chart2.render();
		}
		updateChart2();
		
		setInterval(function(){updateChart2()}, updateInterval2); 