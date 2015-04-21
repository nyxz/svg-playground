$(document).ready(function() {
	var data = initData();

	spiderchart(data.data, 'spiderchart-container');
	sliderchart(data.data, 'sliderchart-container');
	dotschart(data.cultureFit, 'dotschart-container');
});

function randomName() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

function randomValue() {
  return parseInt(((Math.random() * 100) + 1).toFixed(2), 10);
}

function initData() {
	var cultureFitValues = [];

	for (var i = 0; i < 100; i++) {
	  cultureFitValues.push({
	    name: randomName(),
	    value: randomValue()
	  });
	}
	return {
		data: [
		  {
		    className: 'company-values',
		    axes: [
		      {axis: "Exceed client expectation", value: 100},
		      {axis: "Communicate openly", value: 89},
		      {axis: "Innovate", value: 54},
		      {axis: "Embrace diversity", value: 92},
		      {axis: "Lead the way", value: 77},
		      {axis: "Constantly learn", value: 34}
		    ]
		  },
		  {
		    className: "person-values",
		    axes: [
		      {axis: "Exceed client\n expectation", value: 88},
		      {axis: "Communicate openly", value: 68},
		      {axis: "Innovate", value: 78},
		      {axis: "Embrace diversity", value: 90},
		      {axis: "Lead the way", value: 40},
		      {axis: "Constantly learn", value: 57}
		    ]
		  }
		],
		cultureFit: {
			all: cultureFitValues,
			current: {
				name: randomName(),
				value: 94
			}
		}
	};
}