document.addEventListener("DOMContentLoaded", function(event) {
	var labels = {
		hours: [
			"00:00",
			"01:00",
			"02:00",
			"03:00",
			"04:00",
			"05:00",
			"06:00",
			"07:00",
			"08:00",
			"09:00",
			"10:00",
			"11:00",
			"12:00",
			"13:00",
			"14:00",
			"15:00",
			"16:00",
			"17:00",
			"18:00",
			"19:00",
			"20:00",
			"21:00",
			"22:00",
			"23:00"
		],
		days: [
			"00",
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31"
		],
		daysOfWeek: [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun"
		],
		months: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		years: [
			"2015",
			"2016",
			"2017",
			"2018",
			"2019"
		],
		timezones: [
			"-12",
			"-11",
			"-10",
			"-09",
			"-08",
			"-07",
			"-06",
			"-05",
			"-04",
			"-03",
			"-02",
			"-01",
			"+00",
			"+01",
			"+02",
			"+03",
			"+04",
			"+05",
			"+06",
			"+07",
			"+08",
			"+09",
			"+10",
			"+11",
			"+12",
			"+13",
			"+14"
		]
	};
	function generateDataset(obj, config) {
		var values = []
		for(var key in obj) {
			values.push(obj[key]);
		}
		return {
			label: config.label,
			data: values,
			borderColor: config.borderColor,
			backgroundColor: config.backgroundColor,
			fill: false
		};
	}
	function renderGraph(canvasId, labels, datasets, chart_type) {
		new Chart(document.getElementById(canvasId), {
			type: chart_type,
			data: {
				labels: labels,
				datasets: datasets
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}
	fetch('/frequency.json')
		.then(res => res.json())
		.then((theData) => {
			var hours = [];
			var config = {
				ipod: {
					borderColor: 'rgba(60, 139, 0, 0.5)',
					backgroundColor: 'rgba(60, 139, 0, 0.5)',
					label: 'iPod'
				}
			}
			var hours = [];
			var days = [];
			var daysOfWeek = [];
			var months = [];
			var years = [];
			var timezones = [];
			for (var postType in config) {
				console.log(postType);
				if (config.hasOwnProperty(postType)) {
					hours.push(generateDataset(theData[postType].hours, config[postType]));
					// TODO days should be indexed from 1
					days.push(generateDataset(theData[postType].days, config[postType]));
					daysOfWeek.push(generateDataset(theData[postType].daysOfWeek, config[postType]));
					months.push(generateDataset(theData[postType].months, config[postType]));
					years.push(generateDataset(theData[postType].years, config[postType]));
					timezones.push(generateDataset(theData[postType].timezones, config[postType]));
				}
			}
			console.log(days);
			renderGraph('hours', labels.hours, hours, 'line');
			renderGraph('days', labels.days, days, 'line');
			renderGraph('daysOfWeek', labels.daysOfWeek, daysOfWeek, 'line');
			renderGraph('months', labels.months, months, 'bar');
			renderGraph('years', labels.years, years, 'bar');
			renderGraph('timezones', labels.timezones, timezones, 'bar');
		})
		.catch(err => {
			throw err
		});
});